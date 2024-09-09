import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrioridadesService } from './prioridades.service';
import { CreatePrioridadeDto } from './dto/create-prioridade.dto';
import { UpdatePrioridadeDto } from './dto/update-prioridade.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GetPrioridadeDto } from './dto/get-prioridade.dto';

@ApiTags('Prioridades')
@Controller('prioridades')
export class PrioridadesController {
  constructor(private readonly prioridadesService: PrioridadesService) {}

  @ApiBody({ type: CreatePrioridadeDto })
  @Post()
  create(@Body() createPrioridadeDto: CreatePrioridadeDto) {
    return this.prioridadesService.create(createPrioridadeDto);
  }

  @ApiBody({ type: [GetPrioridadeDto] })
  @Get()
  findAll() {
    return this.prioridadesService.findAll();
  }

  @ApiBody({ type: [GetPrioridadeDto] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prioridadesService.findOne(+id);
  }

  @ApiBody({ type: CreatePrioridadeDto }) //se usa el create
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrioridadeDto: UpdatePrioridadeDto) {
    return this.prioridadesService.update(+id, updatePrioridadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prioridadesService.remove(+id);
  }
}
