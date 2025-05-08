import { Module } from '@nestjs/common';
import { VantagemService } from './vantagem.service';
import { VantagemController } from './vantagem.controller';

@Module({
  controllers: [VantagemController],
  providers: [VantagemService],
})
export class VantagemModule {}
