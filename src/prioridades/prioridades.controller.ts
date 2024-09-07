import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrioridadesService } from './prioridades.service';
import { CreatePrioridadeDto } from './dto/create-prioridade.dto';
import { UpdatePrioridadeDto } from './dto/update-prioridade.dto';

@Controller('prioridades')
export class PrioridadesController {
  constructor(private readonly prioridadesService: PrioridadesService) {}

  @Post()
  create(@Body() createPrioridadeDto: CreatePrioridadeDto) {
    return this.prioridadesService.create(createPrioridadeDto);
  }

  @Get()
  findAll() {
    return this.prioridadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prioridadesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrioridadeDto: UpdatePrioridadeDto) {
    return this.prioridadesService.update(+id, updatePrioridadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prioridadesService.remove(+id);
  }
}
