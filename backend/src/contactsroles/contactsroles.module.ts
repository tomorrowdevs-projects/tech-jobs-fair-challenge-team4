import { Module } from '@nestjs/common';
import { ContactsrolesService } from './contactsroles.service';
import { ContactsrolesController } from './contactsroles.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ContactsrolesController],
  providers: [ContactsrolesService],
  imports: [PrismaModule],
  exports: [ContactsrolesService],
})
export class ContactsrolesModule {}
