import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { Distrito } from 'src/distritos/entities/distrito.entity';

@Injectable()
export class ClientesService {

  constructor(@InjectRepository(Cliente) private clienteRepository: Repository<Cliente>, @InjectRepository(Distrito) private distritoRepository: Repository<Distrito>) { }

  async create(createClienteDto: CreateClienteDto) {
    const distritoExists = await this.distritoRepository.findOneBy({
      id: parseInt(createClienteDto.distrito_id)
    });

    if (!distritoExists) {
      throw new HttpException('El distrito no existe', HttpStatus.NOT_FOUND);
    }

    const clienteExists = await this.clienteRepository.findOneBy({
      cod_contrato: parseInt(createClienteDto.cod_contrato)
    });

    if (clienteExists) {
      throw new HttpException('El cliente ya existe', HttpStatus.CONFLICT);
    }

    const cliente = this.clienteRepository.create({
      cod_contrato: parseInt(createClienteDto.cod_contrato),
      nombres: createClienteDto.nombres,
      direccion: createClienteDto.direccion,
      domicilio_legal: createClienteDto.domicilio_legal,
      dni: createClienteDto.dni,
      ruc: createClienteDto.ruc,
      telefono: createClienteDto.telefono,
      email: createClienteDto.email,
      nacimiento: createClienteDto.nacimiento,
      ubigeo: createClienteDto.ubigeo,
      distrito: distritoExists
    });

    await this.clienteRepository.save(cliente);

    return cliente;
  }

  findAll() {
    const clientes = this.clienteRepository.find({
      order: { cod_contrato: 'DESC' },
    });

    return clientes;
  }

  async findOne(cod_contrato: number) {
    const cliente = await this.clienteRepository.findOneBy({
      cod_contrato: cod_contrato,
      estado: true
    });

    if (!cliente) {
      throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!cliente.estado) {
      throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
    }

    return cliente;
  }

  async update(cod_contrato: number, updateClienteDto: UpdateClienteDto) {

    const cliente = await this.clienteRepository.findOneBy({
      cod_contrato: cod_contrato
    });

    if (!cliente) {
      throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
    }

    const distritoExists = await this.distritoRepository.findOneBy({
      id: parseInt(updateClienteDto.distrito_id)
    });

    if (!distritoExists) {
      throw new HttpException('El distrito no existe', HttpStatus.NOT_FOUND);
    }

    cliente.nombres = updateClienteDto.nombres;
    cliente.direccion = updateClienteDto.direccion;
    cliente.domicilio_legal = updateClienteDto.domicilio_legal;
    cliente.dni = updateClienteDto.dni;
    cliente.ruc = updateClienteDto.ruc;
    cliente.telefono = updateClienteDto.telefono;
    cliente.email = updateClienteDto.email;
    cliente.nacimiento = updateClienteDto.nacimiento;
    cliente.ubigeo = updateClienteDto.ubigeo;
    cliente.distrito = distritoExists;

    await this.clienteRepository.update(cod_contrato, cliente);

    return { menssage: 'Cliente actualizado' };
  }

  async remove(cod_contrato: number) {
    const cliente = await this.clienteRepository.findOneBy({
      cod_contrato: cod_contrato
    });

    if (!cliente) {
      throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!cliente.estado) {
      throw new HttpException('Cliente eliminado', HttpStatus.NOT_FOUND);
    }

    await this.clienteRepository.update(cod_contrato, { estado: false });

    return { menssage: 'Cliente eliminado' };
  }

  //ahora vamos a crear un metodo para resivir un arreglo de datos de clientes incluido todos los campos para recorrelos y guardarlos en la base de datos, si el codigo del contrato ya existe se debe de actualizar los datos del cliente y si no existe se debe de crear un nuevo cliente. Empecemos.

  async createMany(clientes: CreateClienteDto[]) {
    for (let i = 0; i < clientes.length; i++) {
      const distritoExists = await this.distritoRepository.findOneBy({
        id: parseInt(clientes[i].distrito_id)
      });

      if (!distritoExists) {
        throw new HttpException('El distrito no existe', HttpStatus.NOT_FOUND);
      }

      const clienteExists = await this.clienteRepository.findOneBy({
        cod_contrato: parseInt(clientes[i].cod_contrato)
      });

      if (clienteExists) {
        clienteExists.nombres = clientes[i].nombres;
        clienteExists.direccion = clientes[i].direccion;
        clienteExists.domicilio_legal = clientes[i].domicilio_legal;
        clienteExists.dni = clientes[i].dni;
        clienteExists.ruc = clientes[i].ruc;
        clienteExists.telefono = clientes[i].telefono;
        clienteExists.email = clientes[i].email;
        clienteExists.nacimiento = clientes[i].nacimiento;
        clienteExists.ubigeo = clientes[i].ubigeo;
        clienteExists.distrito = distritoExists;

        await this.clienteRepository.update(clienteExists.cod_contrato, clienteExists);
      } else {
        const cliente = this.clienteRepository.create({
          cod_contrato: parseInt(clientes[i].cod_contrato),
          nombres: clientes[i].nombres,
          direccion: clientes[i].direccion,
          domicilio_legal: clientes[i].domicilio_legal,
          dni: clientes[i].dni,
          ruc: clientes[i].ruc,
          telefono: clientes[i].telefono,
          email: clientes[i].email,
          nacimiento: clientes[i].nacimiento,
          ubigeo: clientes[i].ubigeo,
          distrito: distritoExists
        });

        await this.clienteRepository.save(cliente);
      }
    }

    return { menssage: 'Clientes guardados correctamente' };
  }
}
