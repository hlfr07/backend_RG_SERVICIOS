import { ApiProperty } from "@nestjs/swagger";

export class GetDetalleModuloPerfilDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    id_modulo: any;
    @ApiProperty()
    id_perfil: any;
    @ApiProperty()
    estado: boolean;
}