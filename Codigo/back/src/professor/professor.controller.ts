import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorDto } from './dto/professor.dto';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Post()
  create(@Body() createProfessorDto: ProfessorDto) {
    return this.professorService.create(createProfessorDto);
  }

  @Get()
  findAll() {
    return this.professorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const professor = this.professorService.findOne(+id);
    if (!professor) {
      throw new NotFoundException(`Professor com id ${id} não encontrado.`);
    }
    return professor;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfessorDto: ProfessorDto) {
    const updated = this.professorService.update(+id, updateProfessorDto);
    if (!updated) {
      throw new NotFoundException(`Professor com id ${id} não encontrado.`);
    }
    return updated;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const deleted = this.professorService.remove(+id);
    if (!deleted) {
      throw new NotFoundException(`Professor com id ${id} não encontrado.`);
    }
    return deleted;
  }
}
