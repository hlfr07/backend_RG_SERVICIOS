import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/login-auth.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs'
import { DetallePerfilesService } from 'src/detalle_perfiles/detalle_perfiles.service';
import { DetalleModuloPerfil } from 'src/detalle_modulo_perfil/entities/detalle_modulo_perfil.entity';
import { DetalleModuloPerfilService } from 'src/detalle_modulo_perfil/detalle_modulo_perfil.service';
import { DetalleModulosTablasService } from 'src/detalle_modulos_tablas/detalle_modulos_tablas.service';
import { ModulosService } from 'src/modulos/modulos.service';
import { TablasService } from 'src/tablas/tablas.service';

@Injectable()
export class AuthService {
  //creamos el constructor para usar el servicio de usuario
  constructor(private readonly usuarioService: UsuariosService,
    private readonly jwtService: JwtService, private readonly detallePerfiles: DetallePerfilesService, private readonly detalleModulosPerfiles: DetalleModuloPerfilService, private detalleModulosTablas: DetalleModulosTablasService, private readonly modulos: ModulosService, private readonly tablas: TablasService) { }
  async create(createAuthDto: CreateAuthDto) {
    //buscamos el usuario por el nombre
    const usuario = await this.usuarioService.buscarParaLogin(createAuthDto.usuario);

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const passwordValido = await bcryptjs.compare(createAuthDto.password, usuario.password);

    if (!passwordValido) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    //buscamos los perfiles que le corresponde a cada usuario
    const detallePerfiles = await this.detallePerfiles.buscarperfilesporidusuario(usuario.id);

    //ahora haremos un foreach para recorrer el detallePerfiles y extraer el perfil
    const perfilesEncontrados = [];

    detallePerfiles.forEach(detallePerfiles => {
      perfilesEncontrados.push(detallePerfiles.perfil);
    });


    //ahora verificamos que el perfiles no haya repetidos

    const perfiles = perfilesEncontrados.filter((valor, indiceActual, arreglo) => arreglo.findIndex((perfil) => perfil.id === valor.id) === indiceActual);

    //console.log(perfiles);


    //console.log(detallePerfiles);


    const detalleModulo = await this.detalleModulosPerfiles.buscarModulosPorPerfil(detallePerfiles);
    //verificamos si el detalleModulo tiene datos

    //console.log(detalleModulo);


    const detalleModulotablas = await this.detalleModulosTablas.buscartablaspormodulo(detalleModulo);

    //console.log(detalleModulotablas);

    const modulos = await this.modulos.buscarModulos(detalleModulotablas);

    //console.log(modulos);

    const tablas = await this.tablas.buscarTablas(detalleModulotablas);

   // console.log(tablas);

    const payload = {
      sub: usuario.id,
      usuario: {
        id: usuario.id,
        usuario: usuario.usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email
      },
      perfiles: perfiles,
      modulos: modulos,
      tablas: tablas
    };

    //console.log(payload.tablas);

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN,
      expiresIn: 60 * 60, // 1 hora
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN,
      expiresIn: 60 * 60 * 24 * 30, // 30 días
    });

    return {
      token: accessToken,
      refreshToken: refreshToken,
    };
  }
}
