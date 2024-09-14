import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleModuloPerfilService } from './detalle_modulo_perfil.service';
import { CreateDetalleModuloPerfilDto } from './dto/create-detalle_modulo_perfil.dto';
import { UpdateDetalleModuloPerfilDto } from './dto/update-detalle_modulo_perfil.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GetDetalleModuloPerfilDto } from './dto/get-detalle_modulo_perfil.dto';

@ApiTags('detalle-modulo-perfil')
@Controller('detalle-modulo-perfil')
export class DetalleModuloPerfilController {
  constructor(private readonly detalleModuloPerfilService: DetalleModuloPerfilService) {}

  @ApiBody({ type: CreateDetalleModuloPerfilDto })
  @Post()
  create(@Body() createDetalleModuloPerfilDto: CreateDetalleModuloPerfilDto) {
    return this.detalleModuloPerfilService.create(createDetalleModuloPerfilDto);
  }

  @ApiBody({ type: [GetDetalleModuloPerfilDto] })
  @Get()
  findAll() {
    return this.detalleModuloPerfilService.findAll();
  }

  @ApiBody({ type: [GetDetalleModuloPerfilDto] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalleModuloPerfilService.findOne(+id);
  }

  @ApiBody({ type: CreateDetalleModuloPerfilDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetalleModuloPerfilDto: UpdateDetalleModuloPerfilDto) {
    return this.detalleModuloPerfilService.update(+id, updateDetalleModuloPerfilDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalleModuloPerfilService.remove(+id);
  }
}
