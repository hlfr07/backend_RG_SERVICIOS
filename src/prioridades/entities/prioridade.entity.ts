import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "prioridades"})
export class Prioridade {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique: true, nullable: false})
    prioridad: string;
    @Column({default: true})
    estado: boolean;
}
