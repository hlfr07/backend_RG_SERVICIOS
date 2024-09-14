import { Module } from '@nestjs/common';
import { DetalleModuloPerfilService } from './detalle_modulo_perfil.service';
import { DetalleModuloPerfilController } from './detalle_modulo_perfil.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleModuloPerfil } from './entities/detalle_modulo_perfil.entity';
import { DetallePerfile } from 'src/detalle_perfiles/entities/detalle_perfile.entity';
import { DetalleModulosTabla } from 'src/detalle_modulos_tablas/entities/detalle_modulos_tabla.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleModuloPerfil, DetallePerfile, DetalleModulosTabla])],
  controllers: [DetalleModuloPerfilController],
  providers: [DetalleModuloPerfilService],
  exports: [DetalleModuloPerfilService]
})
export class DetalleModuloPerfilModule {}
