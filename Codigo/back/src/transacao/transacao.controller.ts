import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { TransacaoDto } from './dto/transacao.dto';
import { Transacao } from '@prisma/client';

@Controller('transacoes')
export class TransacaoController {
  constructor(private readonly transacaoService: TransacaoService) { }

  @Post()
  async create(@Body() transacaoDto: TransacaoDto): Promise<Transacao> {
    return this.transacaoService.create(transacaoDto);
  }

  @Get()
  async findAll(): Promise<Transacao[]> {
    return this.transacaoService.findAll();
  }

  @Get('aluno/:alunoId')
  async findByAlunoId(@Param('alunoId', ParseIntPipe) alunoId: number): Promise<Transacao[]> {
    return this.transacaoService.findByAlunoId(alunoId);
  }

  @Get('professor/:professorId')
  async findByProfessorId(@Param('professorId', ParseIntPipe) professorId: number): Promise<Transacao[]> {
    return this.transacaoService.findByProfessorId(professorId);
  }



  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() transacaoDto: TransacaoDto,
  ): Promise<Transacao> {
    return this.transacaoService.update(id, transacaoDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Transacao> {
    return this.transacaoService.delete(id);
  }


  @Post('comprar-com-cupom')
  async comprarComCupom(
    @Body() body: { transacaoDto: TransacaoDto; cupomId: number }
  ) {
    const { transacaoDto, cupomId } = body;
    return this.transacaoService.comprarComCupom(transacaoDto, cupomId);
  }
}