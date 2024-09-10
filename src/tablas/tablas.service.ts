import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTablaDto } from './dto/create-tabla.dto';
import { UpdateTablaDto } from './dto/update-tabla.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tabla } from './entities/tabla.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TablasService {
  
  constructor(@InjectRepository(Tabla) private tablaRepository: Repository<Tabla>) { }

  async create(createTablaDto: CreateTablaDto) {
    const tablaEncontrada = await this.tablaRepository.findOneBy({
      tabla: createTablaDto.tabla
    });

    if (tablaEncontrada) {
      throw new HttpException('La tabla ya existe', HttpStatus.CONFLICT);
    }

    const nuevaTabla = this.tablaRepository.create({
      tabla: createTablaDto.tabla,
    });

    await this.tablaRepository.save(nuevaTabla);

    return { message: 'Tabla creada correctamente' };
  }

  findAll() {
    const tablas = this.tablaRepository.find({
      order: { id: 'DESC' }
    });

    return tablas;
  }

  async findOne(id: number) {
    const tablaEncontrada = await this.tablaRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!tablaEncontrada) {
      throw new HttpException('Tabla no encontrada', HttpStatus.NOT_FOUND);
    }

    if (!tablaEncontrada.estado) {
      throw new HttpException('Tabla no encontrada', HttpStatus.NOT_FOUND);
    }

    return tablaEncontrada;
  }

  async update(id: number, updateTablaDto: UpdateTablaDto) {
    const tablaEncontrada = await this.tablaRepository.findOneBy({
      id: id,
    });

    if (!tablaEncontrada) {
      throw new HttpException('Tabla no encontrada', HttpStatus.NOT_FOUND);
    }

    //comprobar la existencia de la tabla con el mismo nombre solo si el nombre es diferente
    if (updateTablaDto.tabla !== tablaEncontrada.tabla) {
      const tablaExistente = await this.tablaRepository.findOneBy({
        tabla: updateTablaDto.tabla
      });

      if (tablaExistente) {
        throw new HttpException('La tabla ya existe', HttpStatus.CONFLICT);
      }
    }

    tablaEncontrada.tabla = updateTablaDto.tabla;

    await this.tablaRepository.update(id, tablaEncontrada);

    return { message: 'Tabla actualizada correctamente' };
  }

  async remove(id: number) {
    const tablaEncontrada = await this.tablaRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!tablaEncontrada) {
      throw new HttpException('Tabla no encontrada', HttpStatus.NOT_FOUND);
    }

    if (!tablaEncontrada.estado) {
      throw new HttpException('Tabla eliminada', HttpStatus.NOT_FOUND);
    }

    tablaEncontrada.estado = false;

    await this.tablaRepository.update(id, tablaEncontrada);

    return { message: 'Tabla eliminada correctamente' };
  }
}
