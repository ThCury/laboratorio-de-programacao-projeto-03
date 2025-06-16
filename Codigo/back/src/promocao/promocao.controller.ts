import { Controller, Post, Param, Get } from '@nestjs/common';
import { PromocaoService } from './promocao.service';

@Controller('promocoes')
export class PromocaoController {
    constructor(private promocaoService: PromocaoService) { }

    @Post('gerar-cupom/:alunoId')
    gerarCupom(@Param('alunoId') alunoId: string) {
        return this.promocaoService.gerarCupomParaAluno(Number(alunoId));
    }

    @Get('cupons/:alunoId')
    async listarCupons(@Param('alunoId') alunoId: number) {
        return this.promocaoService.listarCuponsPorAluno(Number(alunoId));
    }



}