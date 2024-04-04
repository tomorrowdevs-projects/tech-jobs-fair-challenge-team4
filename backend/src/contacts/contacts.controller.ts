import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactEntity } from './entities/contact.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('contacts')
@ApiTags('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ContactEntity })
  async create(@Request() req, @Body() createContactDto: CreateContactDto) {
    return new ContactEntity(
      await this.contactsService.create(createContactDto, req.user.id)
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ContactEntity, isArray: true })
  async findAll(@Request() req) {
    const contacts = await this.contactsService.findAll(req.user.id);
    return contacts?.map((contact) => new ContactEntity(contact));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ContactEntity, isArray: true })
  async findAllInternal(@Request() req) {
    const contacts = await this.contactsService.findAllInternal(req.user.id);
    return contacts?.map((contact) => new ContactEntity(contact));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ContactEntity, isArray: true })
  async findAllExternal(@Request() req) {
    const contacts = await this.contactsService.findAllExternal(req.user.id);
    return contacts?.map((contact) => new ContactEntity(contact));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ContactEntity })
  async findOne(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const contact = await this.contactsService.findOne(+id, req.user.id);
    if (contact)
      return new ContactEntity(contact as ContactEntity);
    else
      return null;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ContactEntity })
  async update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateContactDto: UpdateContactDto
  ) {
    return new ContactEntity(
      await this.contactsService.update(+id, updateContactDto, req.user.id)
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ContactEntity })
  async remove(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return new ContactEntity(await this.contactsService.remove(+id, req.user.id));
  }
}
