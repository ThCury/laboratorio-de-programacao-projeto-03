import { Injectable } from '@nestjs/common';
import { InstituicaoDto } from './dto/instituicao.dto';

@Injectable()
export class InstituicaoService {
  create(createInstituicaoDto: InstituicaoDto) {
    return 'This action adds a new instituicao';
  }

  findAll() {
    return `This action returns all instituicao`;
  }

  findOne(id: number) {
    return `This action returns a #${id} instituicao`;
  }

  update(id: number, updateInstituicaoDto: InstituicaoDto) {
    return `This action updates a #${id} instituicao`;
  }

  remove(id: number) {
    return `This action removes a #${id} instituicao`;
  }
}
