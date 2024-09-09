import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePrioridadeDto } from './dto/create-prioridade.dto';
import { UpdatePrioridadeDto } from './dto/update-prioridade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prioridade } from './entities/prioridade.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PrioridadesService {
  constructor(@InjectRepository(Prioridade) private prioridadRepository: Repository<Prioridade>) { }
  async create(createPrioridadeDto: CreatePrioridadeDto) {

    //verficar que no sea texto
    if (isNaN(Number(createPrioridadeDto.prioridad))) {
      throw new HttpException('La prioridad debe ser un número', HttpStatus.BAD_REQUEST);
    }
    const prioridadesEncontrada = await this.prioridadRepository.findOneBy({
      prioridad: Number(createPrioridadeDto.prioridad)
    });

    if (prioridadesEncontrada) {
      throw new HttpException('La prioridad ya existe', HttpStatus.CONFLICT);
    }

    const nuevaPrioridad = this.prioridadRepository.create({
      prioridad: Number(createPrioridadeDto.prioridad)
    });

    

    await this.prioridadRepository.save(nuevaPrioridad);

    return { message: 'Prioridad creada correctamente' };
  }

  findAll() {
    const prioridades = this.prioridadRepository.find({
      order: { id: 'DESC' }
    });

    return prioridades;
  }

  async findOne(id: number) {
    const prioridadEncontrada = await this.prioridadRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!prioridadEncontrada) {
      throw new HttpException('Prioridad no encontrada', HttpStatus.NOT_FOUND);
    }

    if (!prioridadEncontrada.estado) {
      throw new HttpException('Prioridad no encontrada', HttpStatus.NOT_FOUND);
    }

    return prioridadEncontrada;
  }

  async update(id: number, updatePrioridadeDto: UpdatePrioridadeDto) {
    const prioridadEncontrada = await this.prioridadRepository.findOneBy({
      id: id,
    });

    if (!prioridadEncontrada) {
      throw new HttpException('Prioridad no encontrada', HttpStatus.NOT_FOUND);
    }

    if(Number(updatePrioridadeDto.prioridad) !== prioridadEncontrada.prioridad) {
      const prioridadEncontrada = await this.prioridadRepository.findOneBy({
        prioridad: Number(updatePrioridadeDto.prioridad)
      });
      if (prioridadEncontrada) {
        throw new HttpException('La prioridad ya existe', HttpStatus.CONFLICT);
      }
    }

    await this.prioridadRepository.update(id, {
      prioridad: Number(updatePrioridadeDto.prioridad)
    });

    return { message: 'Prioridad actualizada correctamente' };
  }

  async remove(id: number) {
    const prioridadEncontrada = await this.prioridadRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!prioridadEncontrada) {
      throw new HttpException('Prioridad no encontrada', HttpStatus.NOT_FOUND);
    }

    if (!prioridadEncontrada.estado) {
      throw new HttpException('Prioridad eliminada', HttpStatus.NOT_FOUND);
    }

    await this.prioridadRepository.update(id, {
      estado: false
    });

    return { message: 'Prioridad eliminada correctamente' };
  }
}
