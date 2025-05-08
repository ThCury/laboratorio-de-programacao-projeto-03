import { Injectable } from '@nestjs/common';
import { ProfessorDto } from './dto/professor.dto';

@Injectable()
export class ProfessorService {
  create(createProfessorDto: ProfessorDto) {
    return 'This action adds a new professor';
  }

  findAll() {
    return `This action returns all professor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} professor`;
  }

  update(id: number, updateProfessorDto: ProfessorDto) {
    return `This action updates a #${id} professor`;
  }

  remove(id: number) {
    return `This action removes a #${id} professor`;
  }
}
