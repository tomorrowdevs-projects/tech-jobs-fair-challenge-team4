import { Module } from '@nestjs/common';
import { ContactsrolesService } from './contactsroles.service';
import { ContactsrolesController } from './contactsroles.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';

@Module({
  controllers: [ContactsrolesController],
  providers: [ContactsrolesService, UsersService, RolesService],
  imports: [PrismaModule],
  exports: [ContactsrolesService],
})
export class ContactsrolesModule {}
