import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateServicioCampoDto } from './dto/create-servicio_campo.dto';
import { UpdateServicioCampoDto } from './dto/update-servicio_campo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicioCampo } from './entities/servicio_campo.entity';
import { Repository } from 'typeorm';
import { Servicio } from 'src/servicios/entities/servicio.entity';

@Injectable()
export class ServicioCamposService {

  constructor(@InjectRepository(ServicioCampo) private servicioCampoRepository: Repository<ServicioCampo>, @InjectRepository(Servicio) private servicioRepository: Repository<Servicio>) { }

  async create(createServicioCampoDto: CreateServicioCampoDto) {
    const servicioExist = await this.servicioRepository.findOneBy({
      id: parseInt(createServicioCampoDto.id_servicio)
    });

    if (!servicioExist) {
      throw new HttpException('Servicio no existe', HttpStatus.BAD_REQUEST);
    }
    
    const campoExist = await this.servicioCampoRepository
    .createQueryBuilder("servicioCampo")
    .where("servicioCampo.nombrecampo = :nombrecampo", { nombrecampo: createServicioCampoDto.nombrecampo })
    .andWhere("servicioCampo.servicio.id = :id_servicio", { id_servicio: servicioExist.id })
    .getOne();
  
    if (campoExist) {
      throw new HttpException('Campo ya existe para este servicio', HttpStatus.BAD_REQUEST);
    }

    const servicioCampo = this.servicioCampoRepository.create({
      nombrecampo: createServicioCampoDto.nombrecampo,
      tipo: createServicioCampoDto.tipo,
      servicio: servicioExist
    });

    await this.servicioCampoRepository.save(servicioCampo);

    return {message : 'Campo creado con exito'};

  }


  findAll() {
    const servicioCampos = this.servicioCampoRepository.find({
      order: { id: 'DESC' }
    });

    return servicioCampos;
  }

  async findOne(id: number) {
    const servicioCampo = await this.servicioCampoRepository.findOneBy({
      id: id
    });

    if (!servicioCampo) {
      throw new HttpException('Campo no existe', HttpStatus.BAD_REQUEST);
    }

    if (!servicioCampo.estado) {
      throw new HttpException('Campo inactivo', HttpStatus.BAD_REQUEST);
    }

    return servicioCampo;
  }

  async update(id: number, updateServicioCampoDto: UpdateServicioCampoDto) {
    const servicioExist = await this.servicioRepository.findOneBy({
      id: parseInt(updateServicioCampoDto.id_servicio)
    });

    if (!servicioExist) {
      throw new HttpException('Servicio no existe', HttpStatus.BAD_REQUEST);
    }

    const servicioCampo = await this.servicioCampoRepository.findOneBy({
      id: id
    });

    if (!servicioCampo) {
      throw new HttpException('Campo no existe', HttpStatus.BAD_REQUEST);
    }


    //comprobar la existencia del campo con el mismo nombre solo si el nombre es diferente segun el servicio seleccionado
    if (updateServicioCampoDto.nombrecampo !== servicioCampo.nombrecampo) {
      const campoExist = await this.servicioCampoRepository
      .createQueryBuilder("servicioCampo")
      .where("servicioCampo.nombrecampo = :nombrecampo", { nombrecampo: updateServicioCampoDto.nombrecampo })
      .andWhere("servicioCampo.servicio.id = :id_servicio", { id_servicio: servicioExist.id })
      .getOne();
    
      if (campoExist) {
        throw new HttpException('Campo ya existe para este servicio', HttpStatus.BAD_REQUEST);
      }
    }

    servicioCampo.nombrecampo = updateServicioCampoDto.nombrecampo;
    servicioCampo.tipo = updateServicioCampoDto.tipo;
    servicioCampo.servicio = servicioExist;

    await this.servicioCampoRepository.update(id, servicioCampo);

    return { message: 'Campo actualizado correctamente' };

  }

  async remove(id: number) {
    const servicioCampo = await this.servicioCampoRepository.findOneBy({
      id: id,
    });

    if (!servicioCampo) {
      throw new HttpException('Campo no existe', HttpStatus.BAD_REQUEST);
    }

    if (!servicioCampo.estado) {
      throw new HttpException('Campo eliminado', HttpStatus.BAD_REQUEST);
    }

    await this.servicioCampoRepository.update(id, {estado: false});

    return { message: 'Campo eliminado correctamente' };
  }
}
