import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { InstituicaoService } from './instituicao.service';
import { InstituicaoDto } from './dto/instituicao.dto';

@Controller('instituicao')
export class InstituicaoController {
  constructor(private readonly instituicaoService: InstituicaoService) {}

  @Post()
  create(@Body() createInstituicaoDto: InstituicaoDto) {
    return this.instituicaoService.create(createInstituicaoDto);
  }

  @Get()
  findAll() {
    return this.instituicaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const instituicao = this.instituicaoService.findOne(+id);
    if (!instituicao) {
      throw new NotFoundException(`Instituição com id ${id} não encontrada.`);
    }
    return instituicao;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstituicaoDto: InstituicaoDto) {
    const updated = this.instituicaoService.update(+id, updateInstituicaoDto);
    if (!updated) {
      throw new NotFoundException(`Instituição com id ${id} não encontrada.`);
    }
    return updated;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const deleted = this.instituicaoService.remove(+id);
    if (!deleted) {
      throw new NotFoundException(`Instituição com id ${id} não encontrada.`);
    }
    return deleted;
  }
}
