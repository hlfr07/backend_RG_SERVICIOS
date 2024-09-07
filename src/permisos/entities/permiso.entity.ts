import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "permisos"})
export class Permiso {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({default: true})
    get: boolean;
    @Column({default: true})
    post: boolean;
    @Column({default: true})
    put: boolean;
    @Column({default: true})
    delete: boolean;
    @Column({default: true})
    estado: boolean;
}
