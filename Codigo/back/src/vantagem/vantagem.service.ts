import { Injectable } from '@nestjs/common';
import { VantagemDto } from './dto/vantagem.dto';

@Injectable()
export class VantagemService {
  create(createVantagemDto: VantagemDto) {
    return 'This action adds a new vantagem';
  }

  findAll() {
    return `This action returns all vantagem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vantagem`;
  }

  update(id: number, updateVantagemDto: VantagemDto) {
    return `This action updates a #${id} vantagem`;
  }

  remove(id: number) {
    return `This action removes a #${id} vantagem`;
  }
}
