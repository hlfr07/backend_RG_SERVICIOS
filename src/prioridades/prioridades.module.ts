import { Module } from '@nestjs/common';
import { PrioridadesService } from './prioridades.service';
import { PrioridadesController } from './prioridades.controller';

@Module({
  controllers: [PrioridadesController],
  providers: [PrioridadesService],
})
export class PrioridadesModule {}
