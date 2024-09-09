import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(@InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>) {}
  async create(createUsuarioDto: CreateUsuarioDto) {
    const dniEncontrado = await this.usuarioRepository.findOneBy({
      dni: createUsuarioDto.dni
    });

    const usuarioEncontrado = await this.usuarioRepository.findOneBy({
      usuario: createUsuarioDto.usuario
    });

    const emailEncontrado = await this.usuarioRepository.findOneBy({
      email: createUsuarioDto.email
    });

    if (dniEncontrado) {
      return { message: 'El dni ya existe' };
    }

    if (emailEncontrado) {
      return { message: 'El email ya existe' };
    }

    if (usuarioEncontrado) {
      return { message: 'El usuario ya existe' };
    }

    const nuevoUsuario = this.usuarioRepository.create(createUsuarioDto);

    await this.usuarioRepository.save(nuevoUsuario);

    return { message: 'Usuario creado correctamente' };
  }

  findAll() {
    const usuarios = this.usuarioRepository.find({
      order: { id: 'DESC' }
    });

    return usuarios;
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOneBy({
      id: id
    });

    if (!usuario) {
      return { message: 'Usuario no encontrado' };
    }

    if (!usuario.estado) {
      return { message: 'Usuario no encontrado' };
    }
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuarioEncontrado = await this.usuarioRepository.findOneBy({
      id: id,
    });

    if (!usuarioEncontrado) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    //comprobar la existencia del dni, usuario, email con el mismo nombre solo si el nombre es diferente
    if (updateUsuarioDto.dni !== usuarioEncontrado.dni) {
      const dniEncontrado = await this.usuarioRepository.findOneBy({
        dni: updateUsuarioDto.dni
      });

      if (dniEncontrado) {
        return { message: 'El dni ya existe' };
      }
    }

    if (updateUsuarioDto.email !== usuarioEncontrado.email) {
      const emailEncontrado = await this.usuarioRepository.findOneBy({
        email: updateUsuarioDto.email
      });

      if (emailEncontrado) {
        return { message: 'El email ya existe' };
      }
    }

    if (updateUsuarioDto.usuario !== usuarioEncontrado.usuario) {
      const usuarioEncontrado = await this.usuarioRepository.findOneBy({
        usuario: updateUsuarioDto.usuario
      });

      if (usuarioEncontrado) {
        return { message: 'El usuario ya existe' };
      }
    }

    await this.usuarioRepository.update(id, updateUsuarioDto);

    return { message: 'Usuario actualizado correctamente' };
  }

  async remove(id: number) {
    const usuarioEncontrado = await this.usuarioRepository.findOneBy({
      id: id,
      estado: true
    });

    if (!usuarioEncontrado) {
      return { message: 'Usuario no encontrado' };
    }

    if (!usuarioEncontrado.estado) {
      return { message: 'Usuario eliminado' };
    }

    await this.usuarioRepository.update(id, { estado: false });

    return { message: 'Usuario eliminado correctamente' };
  }
}
