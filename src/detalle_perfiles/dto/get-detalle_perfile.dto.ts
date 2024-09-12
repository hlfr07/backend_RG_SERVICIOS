import { ApiProperty } from "@nestjs/swagger";

export class GetDetallePerfileDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    id_perfil: any;
    @ApiProperty()
    id_usuario: any;
    @ApiProperty()
    estado: boolean;
}