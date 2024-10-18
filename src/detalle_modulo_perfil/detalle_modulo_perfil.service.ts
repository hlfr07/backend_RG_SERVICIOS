import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDetalleModuloPerfilDto } from './dto/create-detalle_modulo_perfil.dto';
import { UpdateDetalleModuloPerfilDto } from './dto/update-detalle_modulo_perfil.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleModuloPerfil } from './entities/detalle_modulo_perfil.entity';
import { DetalleModulosTabla } from 'src/detalle_modulos_tablas/entities/detalle_modulos_tabla.entity';
import { DetallePerfile } from 'src/detalle_perfiles/entities/detalle_perfile.entity';
import { Console } from 'console';

@Injectable()
export class DetalleModuloPerfilService {

  constructor(@InjectRepository(DetalleModulosTabla) private detallemodulostablaRepository: Repository<DetalleModulosTabla>,
    @InjectRepository(DetallePerfile) private detalleperfileRepository: Repository<DetallePerfile>,
    @InjectRepository(DetalleModuloPerfil) private detallemoduloperfilRepository: Repository<DetalleModuloPerfil>) { }

  async create(createDetalleModuloPerfilDto: CreateDetalleModuloPerfilDto) {
    const moduloEncontrado = await this.detallemodulostablaRepository.findOneBy({
      id: parseInt(createDetalleModuloPerfilDto.id_modulo)
    });

    if (!moduloEncontrado) {
      throw new HttpException('El modulo no existe', HttpStatus.CONFLICT);
    }

    const perfilEncontrado = await this.detalleperfileRepository.findOneBy({
      id: parseInt(createDetalleModuloPerfilDto.id_perfil)
    });

    if (!perfilEncontrado) {
      throw new HttpException('El perfil no existe', HttpStatus.CONFLICT);
    }

    const nuevoDetalleModuloPerfil = this.detallemoduloperfilRepository.create({
      detalle_modulo: moduloEncontrado,
      detalle_perfil: perfilEncontrado,
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
      id: parseInt(updateDetalleModuloPerfilDto.id_modulo)
    });

    if (!moduloEncontrado) {
      throw new HttpException('El modulo no existe', HttpStatus.CONFLICT);
    }

    const perfilEncontrado = await this.detalleperfileRepository.findOneBy({
      id: parseInt(updateDetalleModuloPerfilDto.id_perfil)
    });

    if (!perfilEncontrado) {
      throw new HttpException('El perfil no existe', HttpStatus.CONFLICT);
    }

    detalleModuloPerfilEncontrado.detalle_modulo = moduloEncontrado;
    detalleModuloPerfilEncontrado.detalle_perfil = perfilEncontrado;

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

  //aqui irian los metodos para buscar los modulos por perfil
  async buscarModulosPorPerfil(detalle_perfil: any[]) {
    //buscamos todos los modulos que esten en estado true
    const detalleModuloPerfilEncontrado = await this.detallemoduloperfilRepository.find({
      where: {
        estado: true
      }
    });

    if (!detalleModuloPerfilEncontrado) {
      throw new HttpException('Detalle Modulo Perfil no encontrado', HttpStatus.NOT_FOUND);
    }

    //ahora con ayuda de un foreach recorremos el detalle_perfil y dentro de eso recorremos el detalleModuloPerfilEncontrado cuando dentro del detallemoduleperfil encontramos el id_detalle_perfil que coincida con el detalle_perfil que estamos recorriendo lo guardamos en un array

    let detalleModulo = [];

    detalle_perfil.forEach(perfil => {
      detalleModuloPerfilEncontrado.forEach(detalle => {
        if (perfil.id == detalle.detalle_perfil.id) {
          detalleModulo.push(detalle);
        }
      });
    });

   //antes de retornar verificamos que no se vayan 2 detalleModulo con el mismo id, usemos foreach para recorrer el array y verificar que no se repitan los id

    let detalleModuloFiltrado = [];

    detalleModulo.forEach(detalle => {
      let existe = false;
      detalleModuloFiltrado.forEach(detalleFiltrado => {
        if (detalle.id == detalleFiltrado.id) {
          existe = true;
        }
      });

      if (!existe) {
        detalleModuloFiltrado.push(detalle);
      }
    });

    return detalleModuloFiltrado
  }
}
