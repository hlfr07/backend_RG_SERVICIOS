import { PartialType } from '@nestjs/swagger';
import { CreateServicioCampoDto } from './create-servicio_campo.dto';

export class UpdateServicioCampoDto extends PartialType(CreateServicioCampoDto) {}
