import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleModulosTablasService } from './detalle_modulos_tablas.service';
import { CreateDetalleModulosTablaDto } from './dto/create-detalle_modulos_tabla.dto';
import { UpdateDetalleModulosTablaDto } from './dto/update-detalle_modulos_tabla.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GetDetalleModulosTablaDto } from './dto/get-detalle_modulos_tablas.dto';

@ApiTags('detalle-modulos-tablas')
@Controller('detalle-modulos-tablas')
export class DetalleModulosTablasController {
  constructor(private readonly detalleModulosTablasService: DetalleModulosTablasService) {}

  @ApiBody({ type: CreateDetalleModulosTablaDto })
  @Post()
  create(@Body() createDetalleModulosTablaDto: CreateDetalleModulosTablaDto) {
    return this.detalleModulosTablasService.create(createDetalleModulosTablaDto);
  }

  @ApiBody({ type: [GetDetalleModulosTablaDto] })
  @Get()
  findAll() {
    return this.detalleModulosTablasService.findAll();
  }

  @ApiBody({ type: [GetDetalleModulosTablaDto] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalleModulosTablasService.findOne(+id);
  }

  @ApiBody({ type: CreateDetalleModulosTablaDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetalleModulosTablaDto: UpdateDetalleModulosTablaDto) {
    return this.detalleModulosTablasService.update(+id, updateDetalleModulosTablaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalleModulosTablasService.remove(+id);
  }
}
