import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDetallePerfileDto } from './dto/create-detalle_perfile.dto';
import { UpdateDetallePerfileDto } from './dto/update-detalle_perfile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Perfile } from 'src/perfiles/entities/perfile.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { DetallePerfile } from './entities/detalle_perfile.entity';

@Injectable()
export class DetallePerfilesService {

  constructor(@InjectRepository(Perfile) private perfileRepository: Repository<Perfile>, @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    @InjectRepository(DetallePerfile) private detalleperfileRepository: Repository<DetallePerfile>) { }

  async create(createDetallePerfileDto: CreateDetallePerfileDto) {
    const perfileEncontrado = await this.perfileRepository.findOneBy({
      id: parseInt(createDetallePerfileDto.perfil)
    });

    if (!perfileEncontrado) {
      throw new HttpException('El perfil no existe', HttpStatus.CONFLICT);
    }

    const usuarioEncontrado = await this.usuarioRepository.findOneBy({
      id: parseInt(createDetallePerfileDto.usuario)
    });

    if (!usuarioEncontrado) {
      throw new HttpException('El usuario no existe', HttpStatus.CONFLICT);
    }

    const nuevoDetallePerfile = this.detalleperfileRepository.create({
      id_perfil: perfileEncontrado.id,
      id_usuario: usuarioEncontrado.id,
    });

    await this.detalleperfileRepository.save(nuevoDetallePerfile);

    return { message: 'Detalle Perfile creado correctamente' };
  }

  findAll() {
    const detallePerfiles = this.detalleperfileRepository.find({
      order: { id: 'DESC' }
    });

    return detallePerfiles;

  }

  async findOne(id: number) {
    const detallePerfileEncontrado = await this.detalleperfileRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!detallePerfileEncontrado) {
      throw new HttpException('Detalle Perfile no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!detallePerfileEncontrado.estado) {
      throw new HttpException('Detalle Perfile no encontrado', HttpStatus.NOT_FOUND);
    }

    return detallePerfileEncontrado;
  }

  async update(id: number, updateDetallePerfileDto: UpdateDetallePerfileDto) {
    const detallePerfileEncontrado = await this.detalleperfileRepository.findOneBy({
      id: id,
    });

    if (!detallePerfileEncontrado) {
      throw new HttpException('Detalle Perfile no encontrado', HttpStatus.NOT_FOUND);
    }

    const perfileEncontrado = await this.perfileRepository.findOneBy({
      id: parseInt(updateDetallePerfileDto.perfil)
    });

    if (!perfileEncontrado) {
      throw new HttpException('El perfil no existe', HttpStatus.CONFLICT);
    }

    const usuarioEncontrado = await this.usuarioRepository.findOneBy({
      id: parseInt(updateDetallePerfileDto.usuario)
    });

    if (!usuarioEncontrado) {
      throw new HttpException('El usuario no existe', HttpStatus.CONFLICT);
    }

    detallePerfileEncontrado.id_perfil = perfileEncontrado.id;
    detallePerfileEncontrado.id_usuario = usuarioEncontrado.id;

    await this.detalleperfileRepository.update(id, detallePerfileEncontrado);

    return { message: 'Detalle Perfile actualizado correctamente' };
  }

  async remove(id: number) {
    const detallePerfileEncontrado = await this.detalleperfileRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!detallePerfileEncontrado) {
      throw new HttpException('Detalle Perfile no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!detallePerfileEncontrado.estado) {
      throw new HttpException('Detalle Perfile no encontrado', HttpStatus.NOT_FOUND);
    }

    await this.detalleperfileRepository.update(id, { estado: false });

    return { message: 'Detalle Perfile eliminado correctamente  ' };
  }
}
