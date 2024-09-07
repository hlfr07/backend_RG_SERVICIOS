import { PartialType } from '@nestjs/mapped-types';
import { CreatePrioridadeDto } from './create-prioridade.dto';

export class UpdatePrioridadeDto extends PartialType(CreatePrioridadeDto) {}
