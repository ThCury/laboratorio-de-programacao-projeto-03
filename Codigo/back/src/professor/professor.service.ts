import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfessorDto } from './dto/professor.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfessorService {
  constructor(private prisma: PrismaService) {}

  async create(createProfessorDto: ProfessorDto): Promise<ProfessorDto> {
    const novoProfessor = await this.prisma.professor.create({
      data: {
        ...createProfessorDto,
        saldo: createProfessorDto.saldo,
      },
    });
    return novoProfessor;
  }

  async findAll(): Promise<ProfessorDto[]> {
    return this.prisma.professor.findMany();
  }

  async findOne(id: number): Promise<ProfessorDto> {
    const professor = await this.prisma.professor.findUnique({
      where: { id },
    });
    if (!professor) {
      throw new NotFoundException(`Professor com id ${id} não encontrado.`);
    }
    return professor;
  }

  async update(id: number, updateProfessorDto: ProfessorDto): Promise<ProfessorDto> {
    await this.findOne(id); // para lançar exceção se não existir

    const updated = await this.prisma.professor.update({
      where: { id },
      data: updateProfessorDto,
    });
    return updated;
  }

  async remove(id: number): Promise<ProfessorDto> {
    await this.findOne(id); // para lançar exceção se não existir

    const deleted = await this.prisma.professor.delete({
      where: { id },
    });
    return deleted;
  }
}
