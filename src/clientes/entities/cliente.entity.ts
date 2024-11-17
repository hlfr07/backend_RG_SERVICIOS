import { Distrito } from "src/distritos/entities/distrito.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "clientes" })
export class Cliente {
    @PrimaryColumn({nullable: false, unique: true})
    cod_contrato: number;

    @Column({ nullable: false })
    nombres: string;

    @Column({ nullable: false })
    direccion: string;

    @Column({ nullable: false })
    domicilio_legal: string;

    @Column({ nullable: false })
    dni: string;

    @Column({ nullable: false })
    ruc: string;

    @Column({ nullable: false })
    telefono: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    nacimiento: string;

    @Column({ nullable: false })
    ubigeo: string;

    @ManyToOne(() => Distrito, distrito => distrito.id, { eager: true })
    @JoinColumn({ name: 'distrito_id' })
    distrito: Distrito;

    @Column({ default: true })
    estado: boolean;
}
