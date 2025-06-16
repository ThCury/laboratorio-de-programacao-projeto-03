import { Injectable } from '@nestjs/common';
import { TransacaoDto } from './dto/transacao.dto';

@Injectable()
export class TransacaoService {
  private transacoes: TransacaoDto[] = [];
  private currentId = 1;

  create(createTransacaoDto: TransacaoDto): TransacaoDto {
    const novaTransacao: TransacaoDto = {
      id: this.currentId++,
      ...createTransacaoDto,
    };
    this.transacoes.push(novaTransacao);
    return novaTransacao;
  }

  findAll(): TransacaoDto[] {
    return this.transacoes;
  }

  findOne(id: number): TransacaoDto | undefined {
    return this.transacoes.find(t => t.id === id);
  }

  update(id: number, updateTransacaoDto: TransacaoDto): TransacaoDto | undefined {
    const index = this.transacoes.findIndex(t => t.id === id);
    if (index === -1) return undefined;

    this.transacoes[index] = { ...this.transacoes[index], ...updateTransacaoDto, id };
    return this.transacoes[index];
  }

  remove(id: number): TransacaoDto | undefined {
    const index = this.transacoes.findIndex(t => t.id === id);
    if (index === -1) return undefined;

    const deleted = this.transacoes[index];
    this.transacoes.splice(index, 1);
    return deleted;
  }
}
