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
      id: parseInt(createDetallePerfileDto.id_perfil)
    });

    if (!perfileEncontrado) {
      throw new HttpException('El perfil no existe', HttpStatus.CONFLICT);
    }

    const usuarioEncontrado = await this.usuarioRepository.findOneBy({
      id: parseInt(createDetallePerfileDto.id_usuario)
    });

    if (!usuarioEncontrado) {
      throw new HttpException('El usuario no existe', HttpStatus.CONFLICT);
    }

    const nuevoDetallePerfile = this.detalleperfileRepository.create({
      perfil: perfileEncontrado,
      usuario: usuarioEncontrado,
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
      id: parseInt(updateDetallePerfileDto.id_perfil)
    });

    if (!perfileEncontrado) {
      throw new HttpException('El perfil no existe', HttpStatus.CONFLICT);
    }

    const usuarioEncontrado = await this.usuarioRepository.findOneBy({
      id: parseInt(updateDetallePerfileDto.id_usuario)
    });

    if (!usuarioEncontrado) {
      throw new HttpException('El usuario no existe', HttpStatus.CONFLICT);
    }

    detallePerfileEncontrado.perfil = perfileEncontrado;
    detallePerfileEncontrado.usuario = usuarioEncontrado;

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

  //crear el metodo para devolver todos los perfiles segun el id del usuario
  async buscarperfilesporidusuario(id: number) {
    // Buscar todos los registros donde el estado sea true
    const detallePerfiles = await this.detalleperfileRepository.find({
      where: { estado: true } // Cargar relaciones si es necesario
    });

    if (!detallePerfiles) {
      throw new HttpException('Detalle Perfile no encontrado', HttpStatus.NOT_FOUND);
    }

    //aca haremos un foreach para almacenar los detalle perfiles egun el id del usuario
    const detalleperfilesuser = [];

    detallePerfiles.forEach(detalle => {
      if (detalle.usuario.id === id) {
        detalleperfilesuser.push(detalle);
      }
    });

    return detalleperfilesuser;

  }
}
