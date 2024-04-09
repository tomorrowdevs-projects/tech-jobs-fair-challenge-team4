import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsPhoneNumber } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  lastName: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  title?: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  @ApiProperty()
  phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  telegram?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  linkedin?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  department?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  company: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  vatNumber?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  location?: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  isExternal: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty()
  notes?: string;
}
