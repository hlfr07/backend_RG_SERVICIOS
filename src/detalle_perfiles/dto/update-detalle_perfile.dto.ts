import { PartialType } from '@nestjs/swagger';
import { CreateDetallePerfileDto } from './create-detalle_perfile.dto';

export class UpdateDetallePerfileDto extends PartialType(CreateDetallePerfileDto) {}
