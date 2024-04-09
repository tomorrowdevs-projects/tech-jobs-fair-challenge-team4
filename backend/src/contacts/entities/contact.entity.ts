import { Contact } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ContactEntity implements Contact {
  constructor(partial: Partial<ContactEntity> | null) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ required: false })
  title: string | null;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false })
  telegram: string | null;

  @ApiProperty({ required: false })
  linkedin: string | null;

  @ApiProperty({ required: false })
  department: string | null;

  @ApiProperty()
  company: string;

  @ApiProperty({ required: false })
  vatNumber: string | null;

  @ApiProperty({ required: false })
  location: string | null;

  @ApiProperty()
  isExternal: boolean;

  @ApiProperty({ required: false })
  notes: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
