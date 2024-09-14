import { DetalleModulosTabla } from "src/detalle_modulos_tablas/entities/detalle_modulos_tabla.entity";
import { DetallePerfile } from "src/detalle_perfiles/entities/detalle_perfile.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'detalle_modulo_perfiles'})
export class DetalleModuloPerfil {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => DetalleModulosTabla, detallemodulostabla => detallemodulostabla.id, {eager: true})
    @JoinColumn({name: 'id_detalle_modulo'})
    id_detalle_modulo: number;

    @ManyToOne(() => DetallePerfile, detalleperfil => detalleperfil.id, {eager: true})
    @JoinColumn({name: 'id_detalle_perfil'})
    id_detalle_perfil: number;

    @Column({default: true})
    estado: boolean;
}
