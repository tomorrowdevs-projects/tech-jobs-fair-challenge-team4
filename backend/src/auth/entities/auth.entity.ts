import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  @ApiProperty()
  user: any;
  @ApiProperty()
  accessToken: string;
}
