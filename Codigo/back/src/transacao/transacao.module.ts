import { Module } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { TransacaoController } from './transacao.controller';
import { AlunoModule } from 'src/aluno/aluno.module';
import { ProfessorModule } from 'src/professor/professor.module';
import { PromocaoModule } from 'src/promocao/promocao.module';

@Module({
  imports: [
    AlunoModule,
    ProfessorModule,
    PromocaoModule,
  ],
  controllers: [TransacaoController],
  providers: [TransacaoService],
})
export class TransacaoModule { }
