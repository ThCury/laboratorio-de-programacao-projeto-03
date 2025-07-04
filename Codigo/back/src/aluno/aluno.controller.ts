import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { AlunoDto } from './dto/aluno.dto';
import { TransacaoDto } from 'src/transacao/dto/transacao.dto';

@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) { }

  @Post('cadastro')
  async create(@Body() aluno: AlunoDto) {
    return await this.alunoService.create(aluno);
  }

  @Get('buscarAlunos')
  async findAll() {
    return await this.alunoService.findAll();
  }

  @Get('buscarAluno/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.alunoService.findOne(id);
  }

  @Put('atualizarAluno/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() aluno: AlunoDto) {
    return await this.alunoService.update(id, aluno);
  }

  @Delete('deletarAluno/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.alunoService.delete(id);
  }

  @Get(':id/saldo')
  async getSaldo(@Param('id', ParseIntPipe) id: number) {
    return this.alunoService.getSaldo(id);
  }

  @Get(':id/historico')
  async getHistoricoTransacoes(@Param('id', ParseIntPipe) id: number) {
    return this.alunoService.getHistoricoTransacoes(id);
  }
}
