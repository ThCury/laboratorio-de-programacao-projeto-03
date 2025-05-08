import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsPositive,
} from 'class-validator';

export class VantagemDto {
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsPositive()
  custo: number;

  @IsOptional()
  @IsInt()
  empresaId?: number;

  constructor(
    id: number,
    titulo: string,
    descricao: string,
    custo: number,
    empresaId?: number,
  ) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.custo = custo;
    this.empresaId = empresaId;
  }
}
