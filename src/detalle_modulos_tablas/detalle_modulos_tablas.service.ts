import { HttpException, HttpStatus, Injectable, Module } from '@nestjs/common';
import { CreateDetalleModulosTablaDto } from './dto/create-detalle_modulos_tabla.dto';
import { UpdateDetalleModulosTablaDto } from './dto/update-detalle_modulos_tabla.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Modulo } from 'src/modulos/entities/modulo.entity';
import { Repository } from 'typeorm';
import { Tabla } from 'src/tablas/entities/tabla.entity';
import { DetalleModulosTabla } from './entities/detalle_modulos_tabla.entity';

@Injectable()
export class DetalleModulosTablasService {
  
  constructor(@InjectRepository(Modulo) private moduloRepository: Repository<Modulo>, @InjectRepository(Tabla) private tablaRepository: Repository<Tabla>,
    @InjectRepository(DetalleModulosTabla) private detalleModulosTablaRepository: Repository<DetalleModulosTabla>) { }

  async create(createDetalleModulosTablaDto: CreateDetalleModulosTablaDto) {
    const moduloEncontrado = await this.moduloRepository.findOneBy({
      id: parseInt(createDetalleModulosTablaDto.modulo)
    });

    if (!moduloEncontrado) {
      throw new HttpException('El modulo no existe', HttpStatus.CONFLICT);
    }

    const tablaEncontrada = await this.tablaRepository.findOneBy({
      id: parseInt(createDetalleModulosTablaDto.tabla)
    });

    if (!tablaEncontrada) {
      throw new HttpException('La tabla no existe', HttpStatus.CONFLICT);
    }

    const nuevoDetalleModulosTabla = this.detalleModulosTablaRepository.create({
      id_modulo: moduloEncontrado.id,
      id_tabla: tablaEncontrada.id,
    });

    await this.detalleModulosTablaRepository.save(nuevoDetalleModulosTabla);

    return { message: 'Detalle Modulos Tabla creado correctamente' };
  }

  findAll() {
    const detalleModulosTablas = this.detalleModulosTablaRepository.find({
      order: { id: 'DESC' }
    });

    return detalleModulosTablas;
  }

  async findOne(id: number) {
    const detalleModulosTablaEncontrado = await this.detalleModulosTablaRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!detalleModulosTablaEncontrado) {
      throw new HttpException('Detalle Modulos Tabla no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!detalleModulosTablaEncontrado.estado) {
      throw new HttpException('Detalle Modulos Tabla eliminado', HttpStatus.CONFLICT);
    }

    return detalleModulosTablaEncontrado;
  }

  async update(id: number, updateDetalleModulosTablaDto: UpdateDetalleModulosTablaDto) {
    const detalleModulosTablaEncontrado = await this.detalleModulosTablaRepository.findOneBy({
      id: id
    });

    if (!detalleModulosTablaEncontrado) {
      throw new HttpException('Detalle Modulos Tabla no encontrado', HttpStatus.NOT_FOUND);
    }

      const moduloEncontrado = await this.moduloRepository.findOneBy({
        id: parseInt(updateDetalleModulosTablaDto.modulo)
      });

      if (!moduloEncontrado) {
        throw new HttpException('El modulo no existe', HttpStatus.CONFLICT);
      }

      detalleModulosTablaEncontrado.id_modulo = moduloEncontrado.id;
    
      const tablaEncontrada = await this.tablaRepository.findOneBy({
        id: parseInt(updateDetalleModulosTablaDto.tabla)
      });

      if (!tablaEncontrada) {
        throw new HttpException('La tabla no existe', HttpStatus.CONFLICT);
      }

      detalleModulosTablaEncontrado.id_tabla = tablaEncontrada.id;
    

    await this.detalleModulosTablaRepository.save(detalleModulosTablaEncontrado);

    return { message: 'Detalle Modulos Tabla actualizado correctamente' };
  }

  async remove(id: number) {
    const detalleModulosTablaEncontrado = await this.detalleModulosTablaRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!detalleModulosTablaEncontrado) {
      throw new HttpException('Detalle Modulos Tabla no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!detalleModulosTablaEncontrado.estado) {
      throw new HttpException('Detalle Modulos Tabla eliminado', HttpStatus.CONFLICT);
    }

    await this.detalleModulosTablaRepository.update(id, { estado: false });

    return { message: 'Detalle Modulos Tabla eliminado correctamente' };
    }
}
