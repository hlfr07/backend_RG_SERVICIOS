import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreatePrioridadeDto {
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'La prioridad no puede estar vacía' })
    @IsString({ message: 'La prioridad debe ser un texto' })
    @MaxLength(50, { message: 'La prioridad debe tener menos de 50 caracteres' })
    @MinLength(1, { message: 'La prioridad debe tener más de 1 caracteres' })
    prioridad: String;
}
