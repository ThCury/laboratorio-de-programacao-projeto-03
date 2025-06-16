import { Injectable } from '@nestjs/common';
import { TransacaoDto } from './dto/transacao.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AlunoService } from 'src/aluno/aluno.service';
import { ProfessorService } from 'src/professor/professor.service';
import { Transacao } from '@prisma/client';
import { PromocaoService } from 'src/promocao/promocao.service';

@Injectable()
export class TransacaoService {
  constructor
    (
      private prismaService: PrismaService,
      private alunoService: AlunoService,
      private professorService: ProfessorService,
      private promocaoService: PromocaoService
    ) { }

  async create(transacaoDto: TransacaoDto): Promise<Transacao> {
    let transacao: Transacao;
    if (transacaoDto.tipo === 'DEPOSITO') {
      if (transacaoDto.professorId === undefined || transacaoDto.valor === undefined) {
        throw new Error('professorId and valor must be defined');
      }
      await this.professorService.updateSaldo(transacaoDto.professorId, transacaoDto.valor);
      transacao = await this.prismaService.transacao.create({
        data: {
          tipo: transacaoDto.tipo,
          valor: transacaoDto.valor,
          professorId: transacaoDto.professorId,
        }
      });
    }

    else if (transacaoDto.tipo === 'TRANSFERENCIA') {
      if (transacaoDto.alunoId === undefined || transacaoDto.valor === undefined || transacaoDto.professorId === undefined) {
        throw new Error('alunoId and valor must be defined');

      }
      await this.alunoService.updateSaldo(transacaoDto.alunoId, transacaoDto.valor);
      await this.professorService.updateSaldo(transacaoDto.professorId, -transacaoDto.valor);
      transacao = await this.prismaService.transacao.create({
        data: {
          tipo: transacaoDto.tipo,
          valor: transacaoDto.valor,
          professorId: transacaoDto.professorId,
          alunoId: transacaoDto.alunoId,
        }
      });
    }

    else if (transacaoDto.tipo === 'RESGATE_VANTAGEM') {
      if (transacaoDto.alunoId === undefined ||
        transacaoDto.valor === undefined ||
        transacaoDto.vantagemId === undefined) {
        throw new Error('alunoId, valor and vantagemId must be defined');
      }
      const vantagem = await this.prismaService.vantagem.findUnique({
        where: { id: transacaoDto.vantagemId },
      });

      if (!vantagem) {
        throw new Error('Vantagem não encontrada');
      }
      await this.alunoService.updateSaldo(transacaoDto.alunoId, -vantagem.custo);
      transacao = await this.prismaService.transacao.create({
        data: {
          tipo: transacaoDto.tipo,
          valor: vantagem.custo,
          alunoId: transacaoDto.alunoId,
          vantagemId: transacaoDto.vantagemId,
        }
      });
    }
    else {
      throw new Error('Tipo de transação inválido');
    }

    return transacao;
  }



  async findAll(): Promise<Transacao[]> {
    const transacoes = await this.prismaService.transacao.findMany({
      include: {
        aluno: true,
        professor: true,
        vantagem: true,
      },
    });

    if (!transacoes || transacoes.length === 0) {
      throw new Error('Nenhuma transação encontrada');
    }

    return transacoes;
  }


  async findByAlunoId(alunoId: number): Promise<Transacao[]> {
    const transacoes = await this.prismaService.transacao.findMany({
      where: { alunoId },
      include: {
        aluno: true,
        professor: true,
        vantagem: true,
      },
    });

    if (!transacoes || transacoes.length === 0) {
      throw new Error(`Nenhuma transação encontrada para o aluno com ID ${alunoId}`);
    }

    return transacoes;
  }


  async findByProfessorId(professorId: number): Promise<Transacao[]> {
    const transacoes = await this.prismaService.transacao.findMany({
      where: { professorId },
      include: {
        aluno: true,
        professor: true,
        vantagem: true,
      },
    });

    if (!transacoes || transacoes.length === 0) {
      throw new Error(`Nenhuma transação encontrada para o professor com ID ${professorId}`);
    }

    return transacoes;
  }



  async update(id: number, transacaoDto: TransacaoDto): Promise<Transacao> {

    const transacaoExistente = await this.prismaService.transacao.findUnique({ where: { id } });

    if (!transacaoExistente) {
      throw new Error(`Transação com ID ${id} não encontrada`);
    }

    return await this.prismaService.$transaction(async (tx) => {
      try {
        if (transacaoExistente.tipo === 'DEPOSITO' && transacaoExistente.professorId) {
          await this.professorService.updateSaldo(transacaoExistente.professorId, -transacaoExistente.valor);
        }

        if (transacaoExistente.tipo === 'TRANSFERENCIA' && transacaoExistente.professorId && transacaoExistente.alunoId) {
          await this.professorService.updateSaldo(transacaoExistente.professorId, transacaoExistente.valor);
          await this.alunoService.updateSaldo(transacaoExistente.alunoId, -transacaoExistente.valor);
        }

        if (transacaoExistente.tipo === 'RESGATE_VANTAGEM' && transacaoExistente.alunoId) {
          await this.alunoService.updateSaldo(transacaoExistente.alunoId, transacaoExistente.valor);
        }

        // Remove a transação antiga
        await tx.transacao.delete({ where: { id } });

        const novaTransacao = await this.create(transacaoDto);
        return novaTransacao;

      } catch (error) {
        throw new Error(`Erro ao atualizar transação: ${error.message}`);
      }
    });
  }


  async delete(id: number): Promise<Transacao> {
    const transacao = await this.prismaService.transacao.findUnique({
      where: { id },
    });

    if (!transacao) {
      throw new Error(`Transação com ID ${id} não encontrada`);
    }

    return await this.prismaService.$transaction(async (tx) => {
      try {
        if (transacao.tipo === 'DEPOSITO' && transacao.professorId) {
          await this.professorService.updateSaldo(transacao.professorId, -transacao.valor);
        }

        if (transacao.tipo === 'TRANSFERENCIA' && transacao.professorId && transacao.alunoId) {
          await this.professorService.updateSaldo(transacao.professorId, transacao.valor);
          await this.alunoService.updateSaldo(transacao.alunoId, -transacao.valor);
        }

        if (transacao.tipo === 'RESGATE_VANTAGEM' && transacao.alunoId) {
          await this.alunoService.updateSaldo(transacao.alunoId, transacao.valor);
        }

        const transacaoDeletada = await tx.transacao.delete({ where: { id } });

        return transacaoDeletada;
      } catch (error) {
        throw new Error(`Erro ao deletar transação: ${error.message}`);
      }
    });
  }


  async comprarComCupom(transacaoDto: TransacaoDto, cupomId: number): Promise<Transacao> {
    return await this.prismaService.$transaction(async (tx) => {
      const cupom = await tx.cupom.findUnique({
        where: { id: cupomId },
      });

      if (!cupom) throw new Error('Cupom não encontrado');

      const vantagem = await tx.vantagem.findUnique({
        where: { id: transacaoDto.vantagemId },
      });

      if (!vantagem) throw new Error('Vantagem não encontrada');

      const valorComDesconto = parseFloat((vantagem.custo * (1 - cupom.taxaDesconto)).toFixed(2));
      if (transacaoDto.alunoId === undefined) {
        throw new Error('alunoId must be defined');
      }
      await this.alunoService.updateSaldo(transacaoDto.alunoId, -valorComDesconto);

      const transacao = await tx.transacao.create({
        data: {
          tipo: 'RESGATE_VANTAGEM',
          valor: valorComDesconto,
          alunoId: transacaoDto.alunoId,
          vantagemId: transacaoDto.vantagemId,
        },
      });

      await this.promocaoService.deletarCupomPorId(cupomId);

      return transacao;
    });
  }

}
