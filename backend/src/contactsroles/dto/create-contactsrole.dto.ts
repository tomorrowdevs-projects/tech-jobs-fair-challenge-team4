import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsPhoneNumber } from 'class-validator';

export class CreateContactsroleDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  contactId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  roleId: number;
}
