import { Modulo } from "src/modulos/entities/modulo.entity";
import { Tabla } from "src/tablas/entities/tabla.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'detalle_modulos_tablas'})
export class DetalleModulosTabla {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Modulo, modulo => modulo.id, {eager: true})
    @JoinColumn({name: 'id_modulo'})
    id_modulo: number;

    @ManyToOne(() => Tabla, tabla => tabla.id, {eager: true})
    @JoinColumn({name: 'id_tabla'})
    id_tabla: number;

    @Column({default: true})
    estado: boolean;
}
