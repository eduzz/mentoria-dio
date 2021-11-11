import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Source from "./Source";
import { User } from "./User";

@Entity()
export class Campaign extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    source_id: number;

    @Column()
    user_id: number;
   
    @Column()
    name: string;

    @Column()
    link: string;   

    @Column()
    investment: number;

    @Column()
    revenues:number;

    @Column({ name: "begin_date" })
    beginDate: Date;  

    @Column({ name: "end_date" })
    endDate: Date;

    @ManyToOne(type => Source)
    @JoinColumn({ name: "source_id" })
    source: Source;

    @ManyToOne(type => User)
    @JoinColumn({ name: "user_id" })
    user: User;
}
