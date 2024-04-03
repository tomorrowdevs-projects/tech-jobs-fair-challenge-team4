import { Module, forwardRef } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { RolesService } from "src/roles/roles.service";

@Module({
	controllers: [UsersController],
	providers: [UsersService, RolesService],
	imports: [PrismaModule],
	exports: [UsersService],
})
export class UsersModule {}
