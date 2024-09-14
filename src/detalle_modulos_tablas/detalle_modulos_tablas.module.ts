import { Module } from '@nestjs/common';
import { DetalleModulosTablasService } from './detalle_modulos_tablas.service';
import { DetalleModulosTablasController } from './detalle_modulos_tablas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleModulosTabla } from './entities/detalle_modulos_tabla.entity';
import { Modulo } from 'src/modulos/entities/modulo.entity';
import { Tabla } from 'src/tablas/entities/tabla.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleModulosTabla, Modulo, Tabla])],
  controllers: [DetalleModulosTablasController],
  providers: [DetalleModulosTablasService],
  exports: [DetalleModulosTablasService]
})
export class DetalleModulosTablasModule {}
