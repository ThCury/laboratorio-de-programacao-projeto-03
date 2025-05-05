import { Injectable } from '@nestjs/common';
import { CreateVantagemDto } from './dto/create-vantagem.dto';
import { UpdateVantagemDto } from './dto/update-vantagem.dto';

@Injectable()
export class VantagemService {
  create(createVantagemDto: CreateVantagemDto) {
    return 'This action adds a new vantagem';
  }

  findAll() {
    return `This action returns all vantagem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vantagem`;
  }

  update(id: number, updateVantagemDto: UpdateVantagemDto) {
    return `This action updates a #${id} vantagem`;
  }

  remove(id: number) {
    return `This action removes a #${id} vantagem`;
  }
}
