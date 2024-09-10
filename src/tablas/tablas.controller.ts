import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TablasService } from './tablas.service';
import { CreateTablaDto } from './dto/create-tabla.dto';
import { UpdateTablaDto } from './dto/update-tabla.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GetTablaDto } from './dto/get-tabla.dto';

@ApiTags('Tablas')
@Controller('tablas')
export class TablasController {
  constructor(private readonly tablasService: TablasService) {}

  @ApiBody({ type: CreateTablaDto })
  @Post()
  create(@Body() createTablaDto: CreateTablaDto) {
    return this.tablasService.create(createTablaDto);
  }

  @ApiBody({ type: [GetTablaDto] })
  @Get()
  findAll() {
    return this.tablasService.findAll();
  }

  @ApiBody({ type: GetTablaDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tablasService.findOne(+id);
  }

  @ApiBody({ type: CreateTablaDto }) //se usa el create para el body
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTablaDto: UpdateTablaDto) {
    return this.tablasService.update(+id, updateTablaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tablasService.remove(+id);
  }
}
