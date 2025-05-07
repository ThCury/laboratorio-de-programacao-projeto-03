import { Injectable } from '@nestjs/common';
import { AlunoDto } from './dto/aluno.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlunoService {
  constructor(private prisma: PrismaService) {}

  async create(dto: AlunoDto): Promise<AlunoDto> {
    const aluno = await this.prisma.aluno.create({
      data: {
        nome: dto.nome,
        CPF: dto.CPF,
        email: dto.email,
        RG: dto.RG,
        endereco: dto.endereco,
        curso: dto.curso,
        saldo: dto.saldo,
        instituicaoId: dto.instituicaoId,
      },
    });
    return new AlunoDto(
      aluno.id,
      aluno.nome,
      aluno.email,
      aluno.CPF,
      aluno.RG,
      aluno.endereco,
      aluno.curso,
      aluno.saldo,
      aluno.instituicaoId,
    );
  }

  async findAll(): Promise<AlunoDto[]> {
    const alunos = await this.prisma.aluno.findMany();

    if (alunos) {
      return alunos.map(
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
      );
    }
    return [];
  }

  async findOne(id: number): Promise<AlunoDto> {
    const aluno = await this.prisma.aluno.findUnique({
      where: {
        id: id,
      },
    });
    if (!aluno) {
      throw new Error(`Aluno com Id ${id} não encontrado`);
    }
    return new AlunoDto(
      id,
      aluno.nome,
      aluno.email,
      aluno.CPF,
      aluno.RG,
      aluno.endereco,
      aluno.curso,
      aluno.saldo,
      aluno.instituicaoId,
    );
  }

  async update(id: number, dto: AlunoDto): Promise<AlunoDto> {
    const aluno = await this.prisma.aluno.update({
      where: {
        id: id,
      },
      data: {
        nome: dto.nome,
        CPF: dto.CPF,
        email: dto.email,
        RG: dto.RG,
        endereco: dto.endereco,
        curso: dto.curso,
        saldo: dto.saldo,
        instituicaoId: dto.instituicaoId,
      },
    });
    return new AlunoDto(
      aluno.id,
      aluno.nome,
      aluno.email,
      aluno.CPF,
      aluno.RG,
      aluno.endereco,
      aluno.curso,
      aluno.saldo,
      aluno.instituicaoId,
    );

  }

  async delete(id: number){
    await this.prisma.aluno.delete({
      where: {
        id: id,
      }
    })
    return { message: `Aluno com Id ${id} deletado com sucesso` };
  }
}
