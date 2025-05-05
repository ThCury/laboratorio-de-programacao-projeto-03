import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VantagemService } from './vantagem.service';
import { CreateVantagemDto } from './dto/create-vantagem.dto';
import { UpdateVantagemDto } from './dto/update-vantagem.dto';

@Controller('vantagem')
export class VantagemController {
  constructor(private readonly vantagemService: VantagemService) {}

  @Post()
  create(@Body() createVantagemDto: CreateVantagemDto) {
    return this.vantagemService.create(createVantagemDto);
  }

  @Get()
  findAll() {
    return this.vantagemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vantagemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVantagemDto: UpdateVantagemDto) {
    return this.vantagemService.update(+id, updateVantagemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vantagemService.remove(+id);
  }
}
