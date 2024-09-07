import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


export class Sesione {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: false})
    fecha: Date;
    @Column({nullable: false, type: "time"})
    hora: string;
    @Column({unique: true, nullable: false})
    idUsuario: number;
    @Column({default: true})
    estado: boolean;
}
