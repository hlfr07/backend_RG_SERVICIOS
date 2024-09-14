import { PartialType } from '@nestjs/swagger';
import { CreateDetalleModuloPerfilDto } from './create-detalle_modulo_perfil.dto';

export class UpdateDetalleModuloPerfilDto extends PartialType(CreateDetalleModuloPerfilDto) {}
