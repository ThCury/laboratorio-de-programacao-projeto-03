import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaDto } from './dto/empresa.dto';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post('cadastro')
  async create(@Body() dto: EmpresaDto) {
    return await this.empresaService.create(dto);
  }

  @Get('buscarEmpresas')
  async findAll() {
    return await this.empresaService.findAll();
  }

  @Get('buscarEmpresa/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.empresaService.findOne(id);
  }

  @Put('editarEmpresa/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: EmpresaDto) {
    return this.empresaService.update(id, dto);
  }

  @Delete('deletarEmpresa/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.empresaService.delete(id);
  }
}
