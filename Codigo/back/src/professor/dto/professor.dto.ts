import { InstituicaoDto } from 'src/instituicao/dto/instituicao.dto';
import { TransacaoDto } from 'src/transacao/dto/transacao.dto';

export class ProfessorDto {
    id: number;
    nome: string;
    CPF: string;
    departamento: string;
    instituicaoId: number;
    instituicao: InstituicaoDto;
    saldo: number;
    transacoes: TransacaoDto[];

    constructor(
        id: number,
        nome: string,
        CPF: string,
        departamento: string,
        instituicaoId: number,
        instituicao: InstituicaoDto,
        saldo: number,
        transacoes: TransacaoDto[],
    ) {
        this.id = id;
        this.nome = nome;
        this.CPF = CPF;
        this.departamento = departamento;
        this.instituicaoId = instituicaoId;
        this.instituicao = instituicao;
        this.saldo = saldo;
        this.transacoes = transacoes;
    }
}
