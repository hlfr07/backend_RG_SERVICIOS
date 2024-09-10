import { Module } from '@nestjs/common';
import { TablasService } from './tablas.service';
import { TablasController } from './tablas.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tabla } from './entities/tabla.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tabla])],
  controllers: [TablasController],
  providers: [TablasService],
  exports: [TablasService]
})
export class TablasModule {}
