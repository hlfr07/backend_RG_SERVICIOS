import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { DetallePerfilesModule } from 'src/detalle_perfiles/detalle_perfiles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallePerfile } from 'src/detalle_perfiles/entities/detalle_perfile.entity';
import { DetalleModuloPerfil } from 'src/detalle_modulo_perfil/entities/detalle_modulo_perfil.entity';
import { DetalleModuloPerfilModule } from 'src/detalle_modulo_perfil/detalle_modulo_perfil.module';
import { DetalleModulosTablasModule } from 'src/detalle_modulos_tablas/detalle_modulos_tablas.module';
import { ModulosModule } from 'src/modulos/modulos.module';
import { TablasModule } from 'src/tablas/tablas.module';

@Module({
  imports: [TablasModule ,ModulosModule,DetalleModulosTablasModule,DetalleModuloPerfilModule,UsuariosModule, DetallePerfilesModule, JwtModule.register({
    global: true,
  })],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
