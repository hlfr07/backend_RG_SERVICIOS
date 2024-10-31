import { ApiProperty } from "@nestjs/swagger";
import Module from "module";
import { Perfile } from "src/perfiles/entities/perfile.entity";
import { Tabla } from "src/tablas/entities/tabla.entity";

export class GetPermisoDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    modulo: Module;
    @ApiProperty()
    tabla: Tabla;
    @ApiProperty()
    perfil: Perfile;
    @ApiProperty()
    get: boolean;
    @ApiProperty()
    post: boolean;
    @ApiProperty()
    put: boolean;
    @ApiProperty()
    delete: boolean;
    @ApiProperty()
    estado: boolean;
}