import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';
import { MailModule } from 'src/mail/mail.module';
import { TablasModule } from 'src/tablas/tablas.module';
import { ModulosModule } from 'src/modulos/modulos.module';
import { DetalleModulosTablasModule } from 'src/detalle_modulos_tablas/detalle_modulos_tablas.module';
import { DetalleModuloPerfilModule } from 'src/detalle_modulo_perfil/detalle_modulo_perfil.module';
import { DetallePerfilesModule } from 'src/detalle_perfiles/detalle_perfiles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), MailModule,
    TablasModule, ModulosModule, DetalleModulosTablasModule, DetalleModuloPerfilModule, DetallePerfilesModule,
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService]
})
export class UsuariosModule { }
