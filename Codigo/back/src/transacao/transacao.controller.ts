import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
    return this.transacaoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransacaoDto: TransacaoDto) {
    return this.transacaoService.update(+id, updateTransacaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transacaoService.remove(+id);
  }
}
