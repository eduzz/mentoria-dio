import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Campaign {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column()
    link: string;

    @Column()
    source: string;

    @Column()
    investment: number;

    @Column()
    revenues:number;

    @Column()
    beginDate: Date;  

    @Column()
    endDate: Date;
}

export default Campaign;