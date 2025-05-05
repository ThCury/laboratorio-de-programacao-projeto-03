import { PartialType } from '@nestjs/mapped-types';
import { CreateVantagemDto } from './create-vantagem.dto';

export class UpdateVantagemDto extends PartialType(CreateVantagemDto) {}
