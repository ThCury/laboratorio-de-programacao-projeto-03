import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { AlunoDto } from 'src/aluno/dto/aluno.dto';
import { ProfessorDto } from 'src/professor/dto/professor.dto';

export class InstituicaoDto {

    @IsOptional()
    id?: number;

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    endereco: string;

    @IsString()
    @IsNotEmpty()
    CNPJ: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AlunoDto)
    alunos?: AlunoDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProfessorDto)
    professores?: ProfessorDto[];

    constructor(
        nome: string,
        endereco: string,
        CNPJ: string,
        id?: number,
        alunos?: AlunoDto[],
        professores?: ProfessorDto[],
    ) {
        this.id = id;
        this.nome = nome;
        this.endereco = endereco;
        this.CNPJ = CNPJ;
        this.alunos = alunos;
        this.professores = professores;
    }
}