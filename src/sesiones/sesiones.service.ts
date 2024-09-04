import { Injectable } from '@nestjs/common';
import { CreateSesioneDto } from './dto/create-sesione.dto';
import { UpdateSesioneDto } from './dto/update-sesione.dto';

@Injectable()
export class SesionesService {
  create(createSesioneDto: CreateSesioneDto) {
    return 'This action adds a new sesione';
  }

  findAll() {
    return `This action returns all sesiones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sesione`;
  }

  update(id: number, updateSesioneDto: UpdateSesioneDto) {
    return `This action updates a #${id} sesione`;
  }

  remove(id: number) {
    return `This action removes a #${id} sesione`;
  }
}
