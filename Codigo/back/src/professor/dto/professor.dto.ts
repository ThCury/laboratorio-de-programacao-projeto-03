import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { InstituicaoDto } from 'src/instituicao/dto/instituicao.dto';
import { TransacaoDto } from 'src/transacao/dto/transacao.dto';

export class ProfessorDto {
    @IsOptional()
    id?: number;

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    CPF: string;

    @IsString()
    @IsNotEmpty()
    departamento: string;

    @IsNotEmpty()
    @Transform(({ value }) => {
        return Number(value);
    })
    instituicaoId: number;

    @IsNotEmpty()
    @Transform(({ value }) => {
        return Number(value);
    })
    saldo: number = 1000;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => TransacaoDto)
    transacoes?: TransacaoDto[];

    constructor(
        id: number,
        nome: string,
        CPF: string,
        departamento: string,
        instituicaoId: number,
        saldo: number,
        transacoes?: TransacaoDto[],
    ) {
        this.id = id;
        this.nome = nome;
        this.CPF = CPF;
        this.departamento = departamento;
        this.instituicaoId = instituicaoId;
        this.saldo = saldo;
        this.transacoes = transacoes;
    }
}
