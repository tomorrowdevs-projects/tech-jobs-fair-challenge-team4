import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService, UsersService, RolesService],
  imports: [PrismaModule],
})
export class ContactsModule {}
