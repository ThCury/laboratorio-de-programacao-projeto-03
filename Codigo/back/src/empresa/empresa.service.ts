import { Injectable } from '@nestjs/common';
import { EmpresaDto } from './dto/empresa.dto';

@Injectable()
export class EmpresaService {
  create(createEmpresaDto: EmpresaDto) {
    return 'This action adds a new empresa';
  }

  findAll() {
    return `This action returns all empresa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} empresa`;
  }

  update(id: number, updateEmpresaDto: EmpresaDto) {
    return `This action updates a #${id} empresa`;
  }

  remove(id: number) {
    return `This action removes a #${id} empresa`;
  }
}
