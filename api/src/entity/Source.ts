import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Source {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}

export default Source;