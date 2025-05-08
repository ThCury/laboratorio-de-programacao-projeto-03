import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EmpresaDto } from './dto/empresa.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { VantagemDto } from 'src/vantagem/dto/vantagem.dto';

@Injectable()
export class EmpresaService {

  constructor(private prisma: PrismaService) { }

  async create(dto: EmpresaDto): Promise<EmpresaDto> {
    const empresa = await this.prisma.empresa.create({
      data: {
        nome: dto.nome,
        email: dto.email,
        cnpj: dto.cnpj
      }
    })
    return new EmpresaDto(
      empresa.id,
      empresa.nome,
      empresa.email,
      empresa.cnpj
    )
  }

  async findAll(): Promise<EmpresaDto[]> {
    const empresas = await this.prisma.empresa.findMany({
      include: {
        vantagens: true
      }
    });

    if (empresas) {
      return empresas.map(
        (empresa) =>
          new EmpresaDto(
            empresa.id,
            empresa.nome,
            empresa.email,
            empresa.cnpj,
            empresa.vantagens?.map(vantagem => new VantagemDto(
              vantagem.id,
              vantagem.titulo,
              vantagem.descricao,
              vantagem.custo,
              vantagem.empresaId
            ))
          ),
      );
    }
    return [];
  }

  async findOne(id: number): Promise<EmpresaDto> {
    const empresa = await this.prisma.empresa.findUnique({
      where: {
        id: id
      },
      include: {
        vantagens: true
      }
    })
    if (!empresa) {
      throw new HttpException('Empresa não encontrada', HttpStatus.NOT_FOUND);
    }

    return new EmpresaDto(
      empresa.id,
      empresa.nome,
      empresa.email,
      empresa.cnpj,
      empresa.vantagens?.map(vantagem => new VantagemDto(
        vantagem.id,
        vantagem.titulo,
        vantagem.descricao,
        vantagem.custo,
        vantagem.empresaId
      ))
    )
  }

  async update(id: number, dto: EmpresaDto): Promise<EmpresaDto> {
    const empresa = await this.prisma.empresa.update({
      where: {
        id: id
      },
      data: {
        nome: dto.nome,
        email: dto.email,
        cnpj: dto.cnpj
      }
    })
    return new EmpresaDto(
      empresa.id,
      empresa.nome,
      empresa.email,
      empresa.cnpj
    )
  }

  async delete(id: number) {
    const empresa = await this.prisma.empresa.delete({
      where: {
        id: id
      }
    })
    if (!empresa) {
      throw new HttpException('Empresa não encontrada', HttpStatus.NOT_FOUND);
    }
    return { message: `Empresa com Id ${id} deletado com sucesso` };
  }

  async addVantagemToEmpresa(empresaId: number, dto: VantagemDto): Promise<VantagemDto> {
    const empresa = await this.prisma.empresa.findUnique({ where: { id: empresaId } });
    if (!empresa) {
      throw new HttpException('Empresa não encontrada', HttpStatus.NOT_FOUND);
    }

    const vantagem = await this.prisma.vantagem.create({
      data: {
        titulo: dto.titulo,
        descricao: dto.descricao,
        custo: dto.custo,
        empresaId: empresaId,
      },
    });

    return new VantagemDto(
      vantagem.id,
      vantagem.titulo,
      vantagem.descricao,
      vantagem.custo,
      vantagem.empresaId
    );
  }

  async findVantagensByEmpresa(empresaId: number): Promise<VantagemDto[]> {
    const empresa = await this.prisma.empresa.findUnique({
      where: { id: empresaId },
      include: { vantagens: true }
    });

    if (!empresa) {
      throw new HttpException('Empresa não encontrada', HttpStatus.NOT_FOUND);
    }

    return empresa.vantagens.map(
      (vantagem) =>
        new VantagemDto(
          vantagem.id,
          vantagem.titulo,
          vantagem.descricao,
          vantagem.custo,
          vantagem.empresaId
        )
    );
  }


}
