import { Module, forwardRef } from "@nestjs/common";
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService, UsersService],
  imports: [PrismaModule],
	exports: [RolesService],
})
export class RolesModule {}
