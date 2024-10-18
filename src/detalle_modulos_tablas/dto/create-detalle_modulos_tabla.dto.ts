import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateDetalleModulosTablaDto {
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El id_modulo no puede estar vacío' })
    @IsString({ message: 'El id_modulo debe ser un texto' })
    @MaxLength(100, { message: 'El id_modulo debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El id_modulo debe tener más de 1 caracteres' })
    id_modulo: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El id_tabla no puede estar vacío' })
    @IsString({ message: 'El id_tabla debe ser un texto' })
    @MaxLength(100, { message: 'El id_tabla debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El id_tabla debe tener más de 1 caracteres' })
    id_tabla: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El id_permiso no puede estar vacío' })
    @IsString({ message: 'El id_permiso debe ser un texto' })
    @MaxLength(100, { message: 'El id_permiso debe tener menos de 100 caracteres' })
    @MinLength(1, { message: 'El id_permiso debe tener más de 1 caracteres' })
    id_permiso: string;

}
