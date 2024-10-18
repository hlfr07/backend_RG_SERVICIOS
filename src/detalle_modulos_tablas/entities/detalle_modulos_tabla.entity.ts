import { Modulo } from "src/modulos/entities/modulo.entity";
import { Permiso } from "src/permisos/entities/permiso.entity";
import { Tabla } from "src/tablas/entities/tabla.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'detalle_modulos_tablas'})
export class DetalleModulosTabla {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Modulo, modulo => modulo.id, {eager: true})
    @JoinColumn({name: 'id_modulo'})
    modulo: Modulo;

    @ManyToOne(() => Tabla, tabla => tabla.id, {eager: true})
    @JoinColumn({name: 'id_tabla'})
    tabla: Tabla;

    @ManyToOne(() => Permiso, permiso => permiso.id, {eager: true})
    @JoinColumn({name: 'id_permiso'})
    permiso: Permiso;

    @Column({default: true})
    estado: boolean;
}
