import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateDetalleModuloPerfilDto {
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El módulo no puede estar vacío' })
    @IsString({ message: 'El módulo debe ser un texto' })
    @MaxLength(100, { message: 'El módulo debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El módulo debe tener más de 1 caracteres' })
    modulo: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El perfil no puede estar vacío' })
    @IsString({ message: 'El perfil debe ser un texto' })
    @MaxLength(100, { message: 'El perfil debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El perfil debe tener más de 1 caracteres' })
    perfil: string;
}
