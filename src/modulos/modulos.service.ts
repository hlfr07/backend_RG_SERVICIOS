import { HttpException, HttpStatus, Injectable, Module } from '@nestjs/common';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Modulo } from './entities/modulo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModulosService {

  constructor (@InjectRepository(Modulo) private moduloRepository: Repository<Modulo>) {}

  async create(createModuloDto: CreateModuloDto) {
    const moduloEncontrado = await this.moduloRepository.findOneBy({
      modulo: createModuloDto.modulo
    });

    if (moduloEncontrado) {
      throw new HttpException('El módulo ya existe', HttpStatus.CONFLICT);
    }

    const nuevoModulo = this.moduloRepository.create({
      modulo: createModuloDto.modulo,
    });

    await this.moduloRepository.save(nuevoModulo);

    return { message: 'Módulo creado correctamente' };
  }

  findAll() {
    const modulos = this.moduloRepository.find({
      order: { id: 'DESC' }
    });

    return modulos;
  }

  async findOne(id: number) {
    const moduloEncontrado = await this.moduloRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!moduloEncontrado) {
      throw new HttpException('Módulo no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!moduloEncontrado.estado) {
      throw new HttpException('Módulo no encontrado', HttpStatus.NOT_FOUND);
    }

    return moduloEncontrado;
  }

  async update(id: number, updateModuloDto: UpdateModuloDto) {
    const moduloEncontrado = await this.moduloRepository.findOneBy({
      id: id,
    });

    if (!moduloEncontrado) {
      throw new HttpException('Módulo no encontrado', HttpStatus.NOT_FOUND);
    }

    //comprobar la existencia del modulo con el mismo nombre solo si el nombre es diferente
    if (updateModuloDto.modulo !== moduloEncontrado.modulo) {
      const moduloEncontrado = await this.moduloRepository.findOneBy({
        modulo: updateModuloDto.modulo
      });

      if (moduloEncontrado) {
        throw new HttpException('El módulo ya existe', HttpStatus.CONFLICT);
      }
    }

    moduloEncontrado.modulo = updateModuloDto.modulo;
    await this.moduloRepository.update(id, updateModuloDto);

    return { message: 'Módulo actualizado correctamente' };
  }

  async remove(id: number) {
    const moduloEncontrado = await this.moduloRepository.findOneBy({
      id: id,
    });

    if (!moduloEncontrado) {
      throw new HttpException('Módulo no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!moduloEncontrado.estado) {
      throw new HttpException('Módulo eliminado', HttpStatus.NOT_FOUND);
    }

    await this.moduloRepository.update(id, { estado: false });

    return { message: 'Módulo eliminado correctamente' };
  }
}
