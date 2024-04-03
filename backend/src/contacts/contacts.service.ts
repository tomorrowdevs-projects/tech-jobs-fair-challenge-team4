import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  create(createContactDto: CreateContactDto) {
    return this.prisma.contact.create({ data: createContactDto });
  }

  findAll(userID: number) {
    return this.prisma.contact.findMany({ where: { userId: userID } });
  }

  findAllInternal(userID: number) {
    return this.prisma.contact.findMany({ where: { userId: userID, isExternal: false } });
  }

  findAllExternal(userID: number) {
    return this.prisma.contact.findMany({ where: { userId: userID, isExternal: true } });
  }

  findOne(id: number, userID: number) {
    return this.prisma.contact.findUnique({
      where: { id, userId: userID },
      include: {
        user: true
      }
    });
  }

  update(id: number, updateContactDto: UpdateContactDto, userID: number) {
    return this.prisma.contact.update({
      where: { id },
      data: updateContactDto
    });
  }

  remove(id: number, userID: number) {
    return this.prisma.contact.delete({ where: { id, userId: userID } });
  }
}
