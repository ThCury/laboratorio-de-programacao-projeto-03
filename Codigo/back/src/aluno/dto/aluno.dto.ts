import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TransacaoDto } from 'src/transacao/dto/transacao.dto';
export class AlunoDto {

    @IsOptional()
    id?: number;

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    CPF: string;

    @IsString()
    @IsNotEmpty()
    RG: string;

    @IsString()
    @IsOptional()
    endereco: string;

    @IsString()
    @IsNotEmpty()
    curso: string;

    @IsNotEmpty()
    @Transform(({ value }) => {
        return Number(value);
    })
    saldo: number = 0;

    @IsNotEmpty()
    @Transform(({ value }) => {
        return Number(value);
    })
    instituicaoId: number;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => TransacaoDto)
    transacoes?: TransacaoDto[];

    constructor(
        id: number,
        nome: string,
        email: string,
        CPF: string,
        RG: string,
        endereco: string,
        curso: string,
        saldo: number,
        instituicaoId: number,
        transacoes?: TransacaoDto[],

    ) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.CPF = CPF;
        this.RG = RG;
        this.endereco = endereco;
        this.curso = curso;
        this.saldo = saldo;
        this.instituicaoId = instituicaoId;
        this.transacoes = transacoes
    }
}
