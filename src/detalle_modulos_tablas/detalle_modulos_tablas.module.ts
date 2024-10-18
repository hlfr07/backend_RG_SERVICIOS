import { Module } from '@nestjs/common';
import { DetalleModulosTablasService } from './detalle_modulos_tablas.service';
import { DetalleModulosTablasController } from './detalle_modulos_tablas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleModulosTabla } from './entities/detalle_modulos_tabla.entity';
import { Modulo } from 'src/modulos/entities/modulo.entity';
import { Tabla } from 'src/tablas/entities/tabla.entity';
import { Permiso } from 'src/permisos/entities/permiso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleModulosTabla, Modulo, Tabla, Permiso])],
  controllers: [DetalleModulosTablasController],
  providers: [DetalleModulosTablasService],
  exports: [DetalleModulosTablasService]
})
export class DetalleModulosTablasModule {}
