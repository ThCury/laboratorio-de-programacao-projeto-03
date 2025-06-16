import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { VantagemService } from './vantagem.service';
import { VantagemDto } from './dto/vantagem.dto';

@Controller('vantagem')
export class VantagemController {
  constructor(private readonly vantagemService: VantagemService) {}

  @Post('cadastro')
  async create(@Body() dto: VantagemDto) {
    return await this.vantagemService.create(dto);
  }

  @Get('buscarVantagens')
  async findAll() {
    return await this.vantagemService.findAll();
  }

  @Get('buscarVantagem/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.vantagemService.findOne(id);
  }

  @Put('atualizarVantagem/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: VantagemDto) {
    return await this.vantagemService.update(id, dto);
  }

  @Delete('deletarVantagem/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.vantagemService.delete(id);
  }
}
