import { ApiProperty } from "@nestjs/swagger";

export class GetDetalleModulosTablaDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    modulo: any;
    @ApiProperty()
    tabla: any;
    @ApiProperty()
    permiso: any;
    @ApiProperty()
    estado: boolean;
}