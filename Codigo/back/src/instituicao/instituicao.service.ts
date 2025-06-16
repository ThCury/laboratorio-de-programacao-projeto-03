import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InstituicaoDto } from './dto/instituicao.dto';
import { AlunoDto } from 'src/aluno/dto/aluno.dto';
import { ProfessorDto } from 'src/professor/dto/professor.dto';

@Injectable()
export class InstituicaoService {
  constructor(private prisma: PrismaService) {}

  async create(dto: InstituicaoDto): Promise<InstituicaoDto> {
    const instituicao = await this.prisma.instituicao.create({
      data: {
        nome: dto.nome,
        endereco: dto.endereco,
        CNPJ: dto.CNPJ,
      },
    });

    return new InstituicaoDto(
      instituicao.nome,
      instituicao.endereco,
      instituicao.CNPJ,
      instituicao.id,
      [], // alunos
      [], // professores
    );
  }

  async findAll(): Promise<InstituicaoDto[]> {
    const instituicoes = await this.prisma.instituicao.findMany({
      include: {
        Aluno: true,
        Professor: true,
      },
    });

    return instituicoes.map(
      (inst) =>
        new InstituicaoDto(
          inst.nome,
          inst.endereco,
          inst.CNPJ,
          inst.id,
          inst.Aluno.map(
            (aluno) =>
              new AlunoDto(
                aluno.id,
                aluno.nome,
                aluno.email,
                aluno.CPF,
                aluno.RG,
                aluno.endereco,
                aluno.curso,
                aluno.saldo,
                aluno.instituicaoId,
              ),
          ),
          inst.Professor.map(
            (prof) =>
              new ProfessorDto(
                prof.id,
                prof.nome,
                prof.CPF,
                prof.departamento,
                prof.instituicaoId,
                prof.saldo,
              ),
          ),
        ),
    );
  }

  async findOne(id: number): Promise<InstituicaoDto> {
    const inst = await this.prisma.instituicao.findUnique({
      where: { id },
      include: {
        Aluno: true,
        Professor: true,
      },
    });

    if (!inst) {
      throw new HttpException(
        `Instituição com ID ${id} não encontrada`,
        HttpStatus.NOT_FOUND,
      );
    }

    return new InstituicaoDto(
      inst.nome,
      inst.endereco,
      inst.CNPJ,
      inst.id,
      inst.Aluno.map(
        (aluno) =>
          new AlunoDto(
            aluno.id,
            aluno.nome,
            aluno.email,
            aluno.CPF,
            aluno.RG,
            aluno.endereco,
            aluno.curso,
            aluno.saldo,
            aluno.instituicaoId,
          ),
      ),
      inst.Professor.map(
        (prof) =>
          new ProfessorDto(
            prof.id,
            prof.nome,
            prof.CPF,
            prof.departamento,
            prof.instituicaoId,
            prof.saldo,
          ),
      ),
    );
  }

  async update(id: number, dto: InstituicaoDto): Promise<InstituicaoDto> {
    const inst = await this.prisma.instituicao.update({
      where: { id },
      data: {
        nome: dto.nome,
        endereco: dto.endereco,
        CNPJ: dto.CNPJ,
      },
    });

    return new InstituicaoDto(
      inst.nome,
      inst.endereco,
      inst.CNPJ,
      inst.id,
    );
  }

  async remove(id: number) {
    await this.prisma.instituicao.delete({
      where: { id },
    });

    return { message: `Instituição com ID ${id} deletada com sucesso.` };
  }
}
