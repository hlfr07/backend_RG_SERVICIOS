import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDetalleModuloPerfilDto } from './dto/create-detalle_modulo_perfil.dto';
import { UpdateDetalleModuloPerfilDto } from './dto/update-detalle_modulo_perfil.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleModuloPerfil } from './entities/detalle_modulo_perfil.entity';
import { DetalleModulosTabla } from 'src/detalle_modulos_tablas/entities/detalle_modulos_tabla.entity';
import { DetallePerfile } from 'src/detalle_perfiles/entities/detalle_perfile.entity';

@Injectable()
export class DetalleModuloPerfilService {
  
  constructor(@InjectRepository(DetalleModulosTabla) private detallemodulostablaRepository: Repository<DetalleModulosTabla>, 
  @InjectRepository(DetallePerfile) private detalleperfileRepository:Repository<DetallePerfile>, 
  @InjectRepository(DetalleModuloPerfil) private detallemoduloperfilRepository: Repository<DetalleModuloPerfil>) { }
  
  async create(createDetalleModuloPerfilDto: CreateDetalleModuloPerfilDto) {
    const moduloEncontrado = await this.detallemodulostablaRepository.findOneBy({
      id: parseInt(createDetalleModuloPerfilDto.modulo)
    });

    if (!moduloEncontrado) {
      throw new HttpException('El modulo no existe', HttpStatus.CONFLICT);
    }

    const perfilEncontrado = await this.detalleperfileRepository.findOneBy({
      id: parseInt(createDetalleModuloPerfilDto.perfil)
    });

    if (!perfilEncontrado) {
      throw new HttpException('El perfil no existe', HttpStatus.CONFLICT);
    }

    const nuevoDetalleModuloPerfil = this.detallemoduloperfilRepository.create({
      id_detalle_modulo: moduloEncontrado.id,
      id_detalle_perfil: perfilEncontrado.id,
    });

    await this.detallemoduloperfilRepository.save(nuevoDetalleModuloPerfil);

    return { message: 'Detalle Modulo Perfil creado correctamente' };
  }

  findAll() {
    const detalleModuloPerfiles = this.detallemoduloperfilRepository.find({
      order: { id: 'DESC' }
    });

    return detalleModuloPerfiles;
  }

  async findOne(id: number) {
    const detalleModuloPerfilEncontrado = await this.detallemoduloperfilRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!detalleModuloPerfilEncontrado) {
      throw new HttpException('Detalle Modulo Perfil no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!detalleModuloPerfilEncontrado.estado) {
      throw new HttpException('Detalle Modulo Perfil no encontrado', HttpStatus.NOT_FOUND);
    }

    return detalleModuloPerfilEncontrado;
  }

  async update(id: number, updateDetalleModuloPerfilDto: UpdateDetalleModuloPerfilDto) {
    const detalleModuloPerfilEncontrado = await this.detallemoduloperfilRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!detalleModuloPerfilEncontrado) {
      throw new HttpException('Detalle Modulo Perfil no encontrado', HttpStatus.NOT_FOUND);
    }

    const moduloEncontrado = await this.detallemodulostablaRepository.findOneBy({
      id: parseInt(updateDetalleModuloPerfilDto.modulo)
    });

    if (!moduloEncontrado) {
      throw new HttpException('El modulo no existe', HttpStatus.CONFLICT);
    }

    const perfilEncontrado = await this.detalleperfileRepository.findOneBy({
      id: parseInt(updateDetalleModuloPerfilDto.perfil)
    });

    if (!perfilEncontrado) {
      throw new HttpException('El perfil no existe', HttpStatus.CONFLICT);
    }

    detalleModuloPerfilEncontrado.id_detalle_modulo = moduloEncontrado.id;
    detalleModuloPerfilEncontrado.id_detalle_perfil = perfilEncontrado.id;

    await this.detallemoduloperfilRepository.save(detalleModuloPerfilEncontrado);

    return { message: 'Detalle Modulo Perfil actualizado correctamente' };
  }

  async remove(id: number) {
    const detalleModuloPerfilEncontrado = await this.detallemoduloperfilRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!detalleModuloPerfilEncontrado) {
      throw new HttpException('Detalle Modulo Perfil no encontrado', HttpStatus.NOT_FOUND);
    }

    await this.detallemoduloperfilRepository.update(id, { estado: false });

    return { message: 'Detalle Modulo Perfil eliminado correctamente' };
  }
}
