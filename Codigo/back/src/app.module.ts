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
import { PromocaoModule } from './promocao/promocao.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { config } from 'process';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', // ou outro SMTP
        port: 587,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"Promoções" <' + process.env.EMAIL_USER + '>', // Endereço de e-mail padrão
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AlunoModule,
    ProfessorModule,
    InstituicaoModule,
    TransacaoModule,
    VantagemModule,
    EmpresaModule,
    PrismaModule,
    PromocaoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
