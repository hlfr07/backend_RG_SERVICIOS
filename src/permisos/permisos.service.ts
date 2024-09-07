import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permiso } from './entities/permiso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermisosService {
  constructor(
    @InjectRepository(Permiso) private permisoRepository: Repository<Permiso>,
  ) {}
  async create(createPermisoDto: CreatePermisoDto) {
    //debemos verificar que los valores sean get, post, put y delete tengan valores true o false
    if (createPermisoDto.get !== 'true' && createPermisoDto.get !== 'false') {
      throw new HttpException(
        'El permiso get debe ser true o false',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (createPermisoDto.post !== 'true' && createPermisoDto.post !== 'false') {
      throw new HttpException(
        'El permiso post debe ser true o false',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (createPermisoDto.put !== 'true' && createPermisoDto.put !== 'false') {
      throw new HttpException(
        'El permiso put debe ser true o false',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      createPermisoDto.delete !== 'true' &&
      createPermisoDto.delete !== 'false'
    ) {
      throw new HttpException(
        'El permiso delete debe ser true o false',
        HttpStatus.BAD_REQUEST,
      );
    }

    const nuevoPermiso = this.permisoRepository.create({
      get: createPermisoDto.get === 'true' ? true : false,
      post: createPermisoDto.post === 'true' ? true : false,
      put: createPermisoDto.put === 'true' ? true : false,
      delete: createPermisoDto.delete === 'true' ? true : false,
    });
    await this.permisoRepository.save(nuevoPermiso);
    return { message: 'Permiso creado correctamente' };
  }

  findAll() {
    const permisos = this.permisoRepository.find({
      order: { id: 'DESC' },
    });
    return permisos;
  }

  async findOne(id: number) {
    const permisoEncontrado = await this.permisoRepository.findOneBy({
      id: id,
      estado: true,
    });
    if (!permisoEncontrado) {
      throw new HttpException('Permiso no encontrado', HttpStatus.NOT_FOUND);
    }
    if (!permisoEncontrado.estado) {
      throw new HttpException('Permiso no encontrado', HttpStatus.NOT_FOUND);
    }
    return permisoEncontrado;
  }

  async update(id: number, updatePermisoDto: UpdatePermisoDto) {
    const permisoEncontrado = await this.permisoRepository.findOneBy({
      id: id,
    });
    if (!permisoEncontrado) {
      throw new HttpException('Permiso no encontrado', HttpStatus.NOT_FOUND);
    }
    if (updatePermisoDto.get !== 'true' && updatePermisoDto.get !== 'false') {
      throw new HttpException(
        'El permiso get debe ser true o false',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (updatePermisoDto.post !== 'true' && updatePermisoDto.post !== 'false') {
      throw new HttpException(
        'El permiso post debe ser true o false',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (updatePermisoDto.put !== 'true' && updatePermisoDto.put !== 'false') {
      throw new HttpException(
        'El permiso put debe ser true o false',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      updatePermisoDto.delete !== 'true' &&
      updatePermisoDto.delete !== 'false'
    ) {
      throw new HttpException(
        'El permiso delete debe ser true o false',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.permisoRepository.update(id, {
      get: updatePermisoDto.get === 'true' ? true : false,
      post: updatePermisoDto.post === 'true' ? true : false,
      put: updatePermisoDto.put === 'true' ? true : false,
      delete: updatePermisoDto.delete === 'true' ? true : false,
    });
    return { message: 'Permiso actualizado correctamente' };
  }

  async remove(id: number) {
    const permisoEncontrado = await this.permisoRepository.findOneBy({
      id: id,
      estado: true,
    });
    if (!permisoEncontrado) {
      throw new HttpException('Permiso no encontrado', HttpStatus.NOT_FOUND);
    }
    if (!permisoEncontrado.estado) {
      throw new HttpException('Permiso eliminado', HttpStatus.NOT_FOUND);
    }
    await this.permisoRepository.update(id, {
      estado: false,
    });
    return { message: 'Permiso eliminado correctamente' };
  }
}
