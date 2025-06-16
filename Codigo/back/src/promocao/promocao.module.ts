import { Module } from '@nestjs/common';
import { PromocaoService } from './promocao.service';
import { PromocaoController } from './promocao.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [MailerModule],
  providers: [PromocaoService],
  controllers: [PromocaoController],
  exports: [PromocaoService],
})
export class PromocaoModule { }
