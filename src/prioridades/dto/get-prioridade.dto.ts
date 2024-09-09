import { ApiProperty } from "@nestjs/swagger";

export class GetPrioridadeDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    prioridad: string;
    @ApiProperty()
    estado: boolean;
}