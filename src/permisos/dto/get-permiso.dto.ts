import { ApiProperty } from "@nestjs/swagger";

export class GetPermisoDto {
    @ApiProperty()
    id: number;
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