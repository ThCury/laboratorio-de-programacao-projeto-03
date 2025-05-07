import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlunoModule } from './aluno/aluno.module';
import { ProfessorModule } from './professor/professor.module';
import { InstituicaoModule } from './instituicao/instituicao.module';
import { TransacaoModule } from './transacao/transacao.module';
import { VantagemModule } from './vantagem/vantagem.module';
import { EmpresaModule } from './empresa/empresa.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AlunoModule,
    ProfessorModule,
    InstituicaoModule,
    TransacaoModule,
    VantagemModule,
    EmpresaModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
