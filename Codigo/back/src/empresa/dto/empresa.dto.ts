import {
    IsArray,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { VantagemDto } from 'src/vantagem/dto/vantagem.dto';
import { Type } from 'class-transformer';
export class EmpresaDto {
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
    cnpj: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => VantagemDto)
    vantagens?: VantagemDto[];

    constructor(
        id: number,
        nome: string,
        email: string,
        cnpj: string,
        vantagens?: VantagemDto[]
    ) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.cnpj = cnpj;
        this.vantagens = vantagens;
    }
}
