import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetallePerfilesService } from './detalle_perfiles.service';
import { CreateDetallePerfileDto } from './dto/create-detalle_perfile.dto';
import { UpdateDetallePerfileDto } from './dto/update-detalle_perfile.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GetDetallePerfileDto } from './dto/get-detalle_perfile.dto';
@ApiTags('detalle-perfiles')
@Controller('detalle-perfiles')
export class DetallePerfilesController {
  constructor(private readonly detallePerfilesService: DetallePerfilesService) {}

  @ApiBody({ type: CreateDetallePerfileDto })
  @Post()
  create(@Body() createDetallePerfileDto: CreateDetallePerfileDto) {
    return this.detallePerfilesService.create(createDetallePerfileDto);
  }

  @ApiBody({ type: [GetDetallePerfileDto] })
  @Get()
  findAll() {
    return this.detallePerfilesService.findAll();
  }

  @ApiBody({ type: [GetDetallePerfileDto] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detallePerfilesService.findOne(+id);
  }

  @ApiBody({ type: CreateDetallePerfileDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetallePerfileDto: UpdateDetallePerfileDto) {
    return this.detallePerfilesService.update(+id, updateDetallePerfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detallePerfilesService.remove(+id);
  }
}
