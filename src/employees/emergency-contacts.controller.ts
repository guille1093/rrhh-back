import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { EmergencyContactsService } from './emergency-contacts.service';
import { CreateEmergencyContactDto } from 'src/employees/dto/create-emergency-contact.dto';

@Controller('emergency-contacts')
export class EmergencyContactsController {
  constructor(
    private readonly emergencyContactsService: EmergencyContactsService,
  ) {}

  @Post()
  create(@Body() createEmergencyContactDto: CreateEmergencyContactDto) {
    return this.emergencyContactsService.create(createEmergencyContactDto);
  }

  @Get()
  findAll() {
    return this.emergencyContactsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emergencyContactsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emergencyContactsService.remove(+id);
  }
}
