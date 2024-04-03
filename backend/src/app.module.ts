import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ContactsModule } from './contacts/contacts.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ContactsrolesModule } from './contactsroles/contactsroles.module';

@Module({
  imports: [PrismaModule, ContactsModule, AuthModule, UsersModule, RolesModule, ContactsrolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
