import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { TransacaoDto } from './dto/transacao.dto';

@Controller('transacao')
export class TransacaoController {
  constructor(private readonly transacaoService: TransacaoService) {}

  @Post()
  create(@Body() createTransacaoDto: TransacaoDto) {
    return this.transacaoService.create(createTransacaoDto);
  }

  @Get()
  findAll() {
    return this.transacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const transacao = this.transacaoService.findOne(+id);
    if (!transacao) {
      throw new NotFoundException(`Transação com id ${id} não encontrada.`);
    }
    return transacao;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransacaoDto: TransacaoDto) {
    const updated = this.transacaoService.update(+id, updateTransacaoDto);
    if (!updated) {
      throw new NotFoundException(`Transação com id ${id} não encontrada.`);
    }
    return updated;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const deleted = this.transacaoService.remove(+id);
    if (!deleted) {
      throw new NotFoundException(`Transação com id ${id} não encontrada.`);
    }
    return deleted;
  }
}
