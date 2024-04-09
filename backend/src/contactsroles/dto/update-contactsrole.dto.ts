import { PartialType } from '@nestjs/swagger';
import { CreateContactsroleDto } from './create-contactsrole.dto';

export class UpdateContactsroleDto extends PartialType(CreateContactsroleDto) {}
