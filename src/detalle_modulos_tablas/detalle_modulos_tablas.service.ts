import { HttpException, HttpStatus, Injectable, Module } from '@nestjs/common';
import { CreateDetalleModulosTablaDto } from './dto/create-detalle_modulos_tabla.dto';
import { UpdateDetalleModulosTablaDto } from './dto/update-detalle_modulos_tabla.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Modulo } from 'src/modulos/entities/modulo.entity';
import { Repository } from 'typeorm';
import { Tabla } from 'src/tablas/entities/tabla.entity';
import { DetalleModulosTabla } from './entities/detalle_modulos_tabla.entity';
import { Permiso } from 'src/permisos/entities/permiso.entity';

@Injectable()
export class DetalleModulosTablasService {

  constructor(@InjectRepository(Modulo) private moduloRepository: Repository<Modulo>, @InjectRepository(Tabla) private tablaRepository: Repository<Tabla>,
    @InjectRepository(DetalleModulosTabla) private detalleModulosTablaRepository: Repository<DetalleModulosTabla>,
    @InjectRepository(Permiso) private permisoRepository: Repository<Permiso>) { }

  async create(createDetalleModulosTablaDto: CreateDetalleModulosTablaDto) {
    const moduloEncontrado = await this.moduloRepository.findOneBy({
      id: parseInt(createDetalleModulosTablaDto.id_modulo)
    });

    if (!moduloEncontrado) {
      throw new HttpException('El modulo no existe', HttpStatus.CONFLICT);
    }

    const tablaEncontrada = await this.tablaRepository.findOneBy({
      id: parseInt(createDetalleModulosTablaDto.id_tabla)
    });

    if (!tablaEncontrada) {
      throw new HttpException('La tabla no existe', HttpStatus.CONFLICT);
    }

    const permisoEncontrado = await this.permisoRepository.findOneBy({
      id: parseInt(createDetalleModulosTablaDto.id_permiso)
    });

    if (!permisoEncontrado) {
      throw new HttpException('El permiso no existe', HttpStatus.CONFLICT);
    }

    const nuevoDetalleModulosTabla = this.detalleModulosTablaRepository.create({
      modulo: moduloEncontrado,
      tabla: tablaEncontrada,
      permiso: permisoEncontrado,
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
      id: parseInt(updateDetalleModulosTablaDto.id_modulo)
    });

    if (!moduloEncontrado) {
      throw new HttpException('El modulo no existe', HttpStatus.CONFLICT);
    }

    detalleModulosTablaEncontrado.modulo = moduloEncontrado;

    const permisoEncontrado = await this.permisoRepository.findOneBy({
      id: parseInt(updateDetalleModulosTablaDto.id_permiso)
    });

    if (!permisoEncontrado) {
      throw new HttpException('El permiso no existe', HttpStatus.CONFLICT);
    }

    detalleModulosTablaEncontrado.permiso = permisoEncontrado;

    const tablaEncontrada = await this.tablaRepository.findOneBy({
      id: parseInt(updateDetalleModulosTablaDto.id_tabla)
    });

    if (!tablaEncontrada) {
      throw new HttpException('La tabla no existe', HttpStatus.CONFLICT);
    }

    detalleModulosTablaEncontrado.tabla = tablaEncontrada;


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

  //aqui irian los metodos para buscar los modulos por perfil
  async buscartablaspormodulo(detalle_modulos: any[]) {
    //buscamos todos los detalle modulos tabla
    const detalleModulosTabla = await this.detalleModulosTablaRepository.find({
      where: {estado: true}
    });

    if (!detalleModulosTabla) {
      throw new HttpException('Detalle Modulos Tabla no encontrado', HttpStatus.NOT_FOUND);
    }

    //ahora con ayuda de un foreach recorremos el detalle_modulos y dentro de eso recorremos el detalleModulosTabla cuando dentro del detalleModulosTabla encontramos el id_detalle_modulos que coincida con el detalle_modulos que estamos recorriendo lo guardamos en un array

    let detalleModulosTablas = [];

    detalle_modulos.forEach(detalle_modulo => {
      detalleModulosTabla.forEach(detalleModuloTabla => {
        if (detalle_modulo.detalle_modulo.id === detalleModuloTabla.id) {
          detalleModulosTablas.push(detalleModuloTabla);
        }
      });
    });

    //antes de retornar verificamos que no se vayan 2 detallemodulostablas con el mismo id, usemos foreach para recorrer el array y verificar que no se repitan los id
    let detalleModulosTablaFiltrado = [];

    detalleModulosTablas.forEach(detalleModuloTabla => {
      let existe = false;
      detalleModulosTablaFiltrado.forEach(detalleModuloTablaFiltrado => {
        if (detalleModuloTabla.id === detalleModuloTablaFiltrado.id) {
          existe = true;
        }
      });

      if (!existe) {
        detalleModulosTablaFiltrado.push(detalleModuloTabla);
      }
    });

    return detalleModulosTablaFiltrado;
    
  }
}
