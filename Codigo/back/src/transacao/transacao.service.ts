import { Injectable } from '@nestjs/common';
import { TransacaoDto } from './dto/transacao.dto';

@Injectable()
export class TransacaoService {
  create(createTransacaoDto: TransacaoDto) {
    return 'This action adds a new transacao';
  }

  findAll() {
    return `This action returns all transacao`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transacao`;
  }

  update(id: number, updateTransacaoDto: TransacaoDto) {
    return `This action updates a #${id} transacao`;
  }

  remove(id: number) {
    return `This action removes a #${id} transacao`;
  }
}
