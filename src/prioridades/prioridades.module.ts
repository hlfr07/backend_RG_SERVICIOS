import { Module } from '@nestjs/common';
import { PrioridadesService } from './prioridades.service';
import { PrioridadesController } from './prioridades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prioridade } from './entities/prioridade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prioridade])],
  controllers: [PrioridadesController],
  providers: [PrioridadesService],
  exports: [PrioridadesService]
})
export class PrioridadesModule {}
