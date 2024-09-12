import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateDetallePerfileDto {
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El perfil no puede estar vacío' })
    @IsString({ message: 'El perfil debe ser un texto' })
    @MaxLength(100, { message: 'El perfil debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El perfil debe tener más de 1 caracteres' })
    perfil: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El usuario no puede estar vacío' })
    @IsString({ message: 'El usuario debe ser un texto' })
    @MaxLength(100, { message: 'El usuario debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El usuario debe tener más de 1 caracteres' })
    usuario: string;
}
