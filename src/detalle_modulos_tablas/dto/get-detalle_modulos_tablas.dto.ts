import { ApiProperty } from "@nestjs/swagger";

export class GetDetalleModulosTablaDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    id_modulo: any;
    @ApiProperty()
    id_tabla: any;
    @ApiProperty()
    estado: boolean;
}