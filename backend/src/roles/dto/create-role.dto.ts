import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  roleManagement: boolean;

  @IsNotEmpty()
  @ApiProperty()
  userManagement: boolean;

  @IsNotEmpty()
  @ApiProperty()
  deleting: boolean;

  @IsNotEmpty()
  @ApiProperty()
  writing: boolean;

  @IsNotEmpty()
  @ApiProperty()
  editing: boolean;

  @IsNotEmpty()
  @ApiProperty()
  reading: boolean;
}
