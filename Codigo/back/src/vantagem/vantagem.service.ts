import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { VantagemDto } from './dto/vantagem.dto';

@Injectable()
export class VantagemService {
  constructor(private prisma: PrismaService) {}

  async create(dto: VantagemDto): Promise<VantagemDto> {
    const data: any = {
      titulo: dto.titulo,
      descricao: dto.descricao,
      custo: dto.custo,
    };

    if (dto.empresaId !== undefined) {
      data.empresaId = dto.empresaId;
    }

    const vantagem = await this.prisma.vantagem.create({ data });

    return new VantagemDto(
      vantagem.id,
      vantagem.titulo,
      vantagem.descricao,
      vantagem.custo,
      vantagem.empresaId,
    );
  }

  async findAll(): Promise<VantagemDto[]> {
    const vantagens = await this.prisma.vantagem.findMany();
    return vantagens.map(v => new VantagemDto(
      v.id,
      v.titulo,
      v.descricao,
      v.custo,
      v.empresaId,
    ));
  }

  async findOne(id: number): Promise<VantagemDto> {
    const vantagem = await this.prisma.vantagem.findUnique({
      where: { id },
    });

    if (!vantagem) {
      throw new HttpException(`Vantagem com id ${id} não encontrada`, HttpStatus.NOT_FOUND);
    }

    return new VantagemDto(
      vantagem.id,
      vantagem.titulo,
      vantagem.descricao,
      vantagem.custo,
      vantagem.empresaId,
    );
  }

  async update(id: number, dto: VantagemDto): Promise<VantagemDto> {
    const updated = await this.prisma.vantagem.update({
      where: { id },
      data: {
        titulo: dto.titulo,
        descricao: dto.descricao,
        custo: dto.custo,
        empresaId: dto.empresaId,
      },
    });

    return new VantagemDto(
      updated.id,
      updated.titulo,
      updated.descricao,
      updated.custo,
      updated.empresaId,
    );
  }

  async delete(id: number) {
    await this.prisma.vantagem.delete({
      where: { id },
    });
    return { message: `Vantagem com id ${id} deletada com sucesso.` };
  }
}
