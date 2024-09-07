import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "permisos"})
export class Permiso {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: false})
    get: boolean;
    @Column({nullable: false})
    post: boolean;
    @Column({nullable: false})
    put: boolean;
    @Column({nullable: false})
    delete: boolean;
    @Column({default: true})
    estado: boolean;
}
