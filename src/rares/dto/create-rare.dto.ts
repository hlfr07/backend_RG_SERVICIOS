import { IsString } from "class-validator";

export class CreateRareDto {
    @IsString()
    nombre: string;
    @IsString()
    password: string;
}
