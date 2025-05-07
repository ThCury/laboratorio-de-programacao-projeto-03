import { AlunoDto } from 'src/aluno/dto/aluno.dto';
import { ProfessorDto } from 'src/professor/dto/professor.dto';

export class InstituicaoDto {
    id: number;
    nome: string;
    endereco: string;
    CNPJ: string;
    alunos: AlunoDto[];
    professores: ProfessorDto[];

    constructor(
        id: number,
        nome: string,
        endereco: string,
        CNPJ: string,
        alunos: AlunoDto[],
        professores: ProfessorDto[],
    ) {
        this.id = id;
        this.nome = nome;
        this.endereco = endereco;
        this.CNPJ = CNPJ;
        this.alunos = alunos;
        this.professores = professores;
    }
}
