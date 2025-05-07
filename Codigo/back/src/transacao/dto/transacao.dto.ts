import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsNumber,
} from 'class-validator';
import { TipoTransacao } from 'generated/prisma/client';

export class TransacaoDto {
  @IsOptional()
  id?: number;

  @IsEnum(TipoTransacao)
  tipo: TipoTransacao;

  @IsNumber()
  @IsPositive()
  valor: number;

  @IsOptional()
  @IsInt()
  alunoId?: number;

  @IsOptional()
  @IsInt()
  professorId?: number;

  @IsOptional()
  @IsInt()
  vantagemId?: number;

  constructor(
    id: number,
    tipo: TipoTransacao,
    valor: number,
    alunoId?: number,
    professorId?: number,
    vantagemId?: number,
  ) {
    this.id = id;
    this.tipo = tipo;
    this.valor = valor;
    this.alunoId = alunoId;
    this.professorId = professorId;
    this.vantagemId = vantagemId;
  }
}
