import { Module } from '@nestjs/common';
import { ModulosService } from './modulos.service';
import { ModulosController } from './modulos.controller';
import { Type } from 'class-transformer';
import { Modulo } from './entities/modulo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Modulo])],
  controllers: [ModulosController],
  providers: [ModulosService],
  exports: [ModulosService]
})
export class ModulosModule {}
