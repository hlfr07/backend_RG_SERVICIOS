import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PerfilesModule } from './perfiles/perfiles.module';
import { ConfigModule } from '@nestjs/config';
import { SesionesModule } from './sesiones/sesiones.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TablasModule } from './tablas/tablas.module';
import { PermisosModule } from './permisos/permisos.module';
import { ModulosModule } from './modulos/modulos.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}