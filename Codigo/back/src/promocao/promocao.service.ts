import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class PromocaoService {
    constructor(
        private prisma: PrismaService,
        private mailerService: MailerService,
    ) { }

    async gerarCupomParaAluno(alunoId: number) {
        const aluno = await this.prisma.aluno.findUnique({ where: { id: alunoId } });
        if (!aluno) throw new Error('Aluno não encontrado');

        const taxaDesconto = parseFloat((Math.random() * (0.30 - 0.10) + 0.10).toFixed(2));

        const cupom = await this.prisma.cupom.create({
            data: {
                taxaDesconto,
                alunoId,
            },
        });

        await this.mailerService.sendMail({
            to: aluno.email,
            subject: 'Você recebeu um cupom de desconto!',
            text: `Olá ${aluno.nome},\n\nVocê ganhou um cupom de desconto de ${(taxaDesconto * 100).toFixed(0)}%! Aproveite!`,
        });

        return cupom;
    }


    async listarCuponsPorAluno(alunoId: number) {
        const cupons = await this.prisma.cupom.findMany({
            where: { alunoId },
        });

        if (!cupons || cupons.length === 0) {
            throw new Error('Nenhum cupom encontrado para este aluno');
        }

        return cupons;
    }


    async deletarCupomPorId(cupomId: number) {
        const cupom = await this.prisma.cupom.findUnique({ where: { id: cupomId } });

        if (!cupom) {
            throw new Error('Cupom não encontrado');
        }

        return this.prisma.cupom.delete({ where: { id: cupomId } });
    }

}