import { PartialType } from '@nestjs/swagger';
import { CreateDetalleModulosTablaDto } from './create-detalle_modulos_tabla.dto';

export class UpdateDetalleModulosTablaDto extends PartialType(CreateDetalleModulosTablaDto) {}
