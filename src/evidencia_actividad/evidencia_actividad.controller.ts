import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { EvidenciaActividadService } from './evidencia_actividad.service';
import { CreateEvidenciaActividadDto } from './dto/create-evidencia_actividad.dto';
import { UpdateEvidenciaActividadDto } from './dto/update-evidencia_actividad.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { GetEvidenciaActividadDto } from './dto/get-evidencia_actividad.dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
@ApiTags('EvidenciaActividad')
@Controller('evidencia-actividad')
export class EvidenciaActividadController {
  constructor(private readonly evidenciaActividadService: EvidenciaActividadService) { }

  @ApiConsumes('multipart/form-data') // Especifica el tipo de contenido
  @ApiBody({
    description: 'Subir un archivo zip o rar junto con los datos de la actividad. <strong>Usar multipart/form-data</strong>',
    type: CreateEvidenciaActividadDto,
  })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('evidencia-actividad', 'post')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',  // Carpeta donde se guardarán los archivos
      filename: (req, file, cb) => {
        // Genera un nombre único para el archivo
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;

        // Sanitiza el nombre original del archivo para eliminar espacios y caracteres no deseados
        const sanitizedOriginalName = file.originalname.replace(/\s/g, '-').replace(/[^a-zA-Z0-9.-]/g, '');

        // Crea el nombre final del archivo con el sufijo único
        const filename = `${uniqueSuffix}-${sanitizedOriginalName}`;

        // Llama a la función de callback con el nuevo nombre de archivo
        cb(null, filename);
      },
    }),
    fileFilter: (req, file, cb) => {
      // Aceptar solo archivos zip o rar
      cb(null, true);  // Acepta cualquier archivo
    },
  }))
  create(@UploadedFile() file: Express.Multer.File, @Body() createEvidenciaActividadDto: CreateEvidenciaActividadDto) {
    return this.evidenciaActividadService.create(createEvidenciaActividadDto, file.filename);
  }

  @ApiBody({ type: [GetEvidenciaActividadDto] })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('evidencia-actividad', 'get')
  findAll() {
    return this.evidenciaActividadService.findAll();
  }

  @ApiBody({ type: GetEvidenciaActividadDto })
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('evidencia-actividad', 'get')
  findOne(@Param('id') id: string) {
    return this.evidenciaActividadService.findOne(+id);
  }

  @ApiConsumes('multipart/form-data') // Especifica el tipo de contenido
  @ApiBody({
    description: 'Subir un archivo zip o rar junto con los datos de la actividad. <strong>Usar multipart/form-data</strong>',
    type: CreateEvidenciaActividadDto,
  })
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('evidencia-actividad', 'put')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',  // Carpeta donde se guardarán los archivos
      filename: (req, file, cb) => {
        // Genera un nombre único para el archivo
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;

        // Sanitiza el nombre original del archivo para eliminar espacios y caracteres no deseados
        const sanitizedOriginalName = file.originalname.replace(/\s/g, '-').replace(/[^a-zA-Z0-9.-]/g, '');

        // Crea el nombre final del archivo con el sufijo único
        const filename = `${uniqueSuffix}-${sanitizedOriginalName}`;

        // Llama a la función de callback con el nuevo nombre de archivo
        cb(null, filename);
      },
    }),
    fileFilter: (req, file, cb) => {
      // Aceptar solo archivos zip o rar
      cb(null, true);  // Acepta cualquier archivo
    },
  }))
  update(@Param('id') id: string, @UploadedFile() file: Express.Multer.File, @Body() updateEvidenciaActividadDto: UpdateEvidenciaActividadDto) {
    return this.evidenciaActividadService.update(+id, updateEvidenciaActividadDto, file.filename);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('evidencia-actividad', 'delete')
  remove(@Param('id') id: string) {
    return this.evidenciaActividadService.remove(+id);
  }
}
