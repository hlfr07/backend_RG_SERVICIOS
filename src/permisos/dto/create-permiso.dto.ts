import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class CreatePermisoDto {
    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El permiso get no puede estar vacío' })
    @IsString({ message: 'El permiso get debe ser un texto' })
    @MaxLength(10, { message: 'El permiso get debe tener menos de 50 caracteres' })
    @MinLength(3, { message: 'El permiso get debe tener más de 3 caracteres' })
    get: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El permiso post no puede estar vacío' })
    @IsString({ message: 'El permiso post debe ser un texto' })
    @MaxLength(10, { message: 'El permiso post debe tener menos de 50 caracteres' })
    @MinLength(3, { message: 'El permiso post debe tener más de 3 caracteres' })
    post: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El permiso put no puede estar vacío' })
    @IsString({ message: 'El permiso put debe ser un texto' })
    @MaxLength(10, { message: 'El permiso put debe tener menos de 50 caracteres' })
    @MinLength(3, { message: 'El permiso put debe tener más de 3 caracteres' })
    put: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty({ message: 'El permiso delete no puede estar vacío' })
    @IsString({ message: 'El permiso delete debe ser un texto' })
    @MaxLength(10, { message: 'El permiso delete debe tener menos de 50 caracteres' })
    @MinLength(3, { message: 'El permiso delete debe tener más de 3 caracteres' })
    delete: string;

    
}
