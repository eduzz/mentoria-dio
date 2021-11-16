import { Channel, connect, Connection, ConsumeMessage } from "amqplib";
import { RABBIT_DSN, SENDGRID_TOKEN } from "./settings";
import sendgrid from '@sendgrid/mail';

const getConnection = async(conn?: Connection): Promise<Connection> => {
    const connection: Connection = conn || await connect(RABBIT_DSN);
    return connection;
}

const getChannel = async(conn: Connection, ch?: Channel) : Promise<Channel> => {
    const channel: Channel = ch || await conn.createChannel();
    return channel;
}

(async() => {
    sendgrid.setApiKey(SENDGRID_TOKEN);
    
    let connection: Connection = await connect(RABBIT_DSN);
    let channel: Channel = await connection.createChannel();

    channel.assertQueue('user.password.reset');
    channel.prefetch(1);
    channel.consume('user.password.reset', async msg => {
        if (!msg) return;
        const json = msg.content.toString() || '';
        const { name, email, link } = JSON.parse(json); 
        const body = {
            to: `${name} <diogo.mainardes@eduzz.com>`,
            from: 'diogomainardes@gmail.com',
            subject: 'Recuperacao de senha',
            html: `<p>Olá... acesse o link abaixo para resetar a sua senha</p>
                   <p><a href='${link}'>${link}</a></p>`,
        }
        try {
            await sendgrid.send(body);
            channel.ack(msg);
        } catch (err: any) {
            console.log(err.response.body);
            channel.nack(msg);
        }
    }, {
        noAck: false
    });
})();