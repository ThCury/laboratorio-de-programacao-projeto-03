import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaDto } from './dto/empresa.dto';
import { VantagemDto } from 'src/vantagem/dto/vantagem.dto';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) { }

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

  @Post(':empresaId/adicionarVantagem')
  async addVantagem(@Param('empresaId', ParseIntPipe) empresaId: number, @Body() dto: VantagemDto) {
    return await this.empresaService.addVantagemToEmpresa(empresaId, dto);
  }

  @Get(':id/vantagens')
  async getVantagens(@Param('id', ParseIntPipe) id: number) {
    return await this.empresaService.findVantagensByEmpresa(id);
  }
}
