import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { get } from 'http';
import { GetPermisoDto } from './dto/get-permiso.dto';
@ApiTags('Permisos')
@Controller('permisos')
export class PermisosController {
  constructor(private readonly permisosService: PermisosService) {}
  @ApiBody({ type: CreatePermisoDto })
  @Post()
  create(@Body() createPermisoDto: CreatePermisoDto) {
    return this.permisosService.create(createPermisoDto);
  }

  @ApiBody({ type: [GetPermisoDto] })
  @Get()
  findAll() {
    return this.permisosService.findAll();
  }

  @ApiBody({ type: [GetPermisoDto] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permisosService.findOne(+id);
  }

  @ApiBody({ type:  CreatePermisoDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermisoDto: UpdatePermisoDto) {
    return this.permisosService.update(+id, updatePermisoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permisosService.remove(+id);
  }
}
