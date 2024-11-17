import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ServicioCamposService } from './servicio_campos.service';
import { CreateServicioCampoDto } from './dto/create-servicio_campo.dto';
import { UpdateServicioCampoDto } from './dto/update-servicio_campo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GetServicioCampoDto } from './dto/get-servicio_campo.dto';

@ApiTags('servicio-campos')
@Controller('servicio-campos')
export class ServicioCamposController {
  constructor(private readonly servicioCamposService: ServicioCamposService) {}

  @ApiBody({ type: CreateServicioCampoDto })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('servicio-campos', 'post')
  create(@Body() createServicioCampoDto: CreateServicioCampoDto) {
    return this.servicioCamposService.create(createServicioCampoDto);
  }

  @ApiBody({ type: [GetServicioCampoDto] })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('servicio-campos', 'get')
  findAll() {
    return this.servicioCamposService.findAll();
  }

  @ApiBody({ type: GetServicioCampoDto })
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('servicio-campos', 'get')
  findOne(@Param('id') id: string) {
    return this.servicioCamposService.findOne(+id);
  }

  @ApiBody({ type: CreateServicioCampoDto })
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('servicio-campos', 'put')
  update(@Param('id') id: string, @Body() updateServicioCampoDto: UpdateServicioCampoDto) {
    return this.servicioCamposService.update(+id, updateServicioCampoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('servicio-campos', 'delete')
  remove(@Param('id') id: string) {
    return this.servicioCamposService.remove(+id);
  }
}
