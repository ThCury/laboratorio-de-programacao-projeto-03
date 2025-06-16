import { Module } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';

@Module({
  controllers: [AlunoController],
  providers: [AlunoService],
  exports: [AlunoService],
})
export class AlunoModule { }
