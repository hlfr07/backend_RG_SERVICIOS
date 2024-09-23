import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PerfilesModule } from './perfiles/perfiles.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SesionesModule } from './sesiones/sesiones.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TablasModule } from './tablas/tablas.module';
import { PermisosModule } from './permisos/permisos.module';
import { ModulosModule } from './modulos/modulos.module';
import { DetallePerfilesModule } from './detalle_perfiles/detalle_perfiles.module';
import { DetalleModulosTablasModule } from './detalle_modulos_tablas/detalle_modulos_tablas.module';
import { DetalleModuloPerfilModule } from './detalle_modulo_perfil/detalle_modulo_perfil.module';
import { MailService } from './mail/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { RaresModule } from './rares/rares.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
      }
    ),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: process.env.POSTGRES_SSL === 'true' ? { rejectUnauthorized: false } : null,
    }),
    PerfilesModule,
    SesionesModule,
    UsuariosModule,
    TablasModule,
    PermisosModule,
    ModulosModule,
    DetallePerfilesModule,
    DetalleModulosTablasModule,
    DetalleModuloPerfilModule,
    MailModule,
    AuthModule,
    RaresModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}