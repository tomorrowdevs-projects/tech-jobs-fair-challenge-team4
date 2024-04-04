import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseIntPipe,
	UseGuards,
	Request,
} from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiTags,
} from "@nestjs/swagger";
import { RoleEntity } from "./entities/role.entity";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserEntity } from "src/users/entities/user.entity";

@Controller("roles")
@ApiTags("roles")
export class RolesController {
	constructor(private readonly rolesService: RolesService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiCreatedResponse({ type: RoleEntity })
	async create(@Request() req, @Body() createRoleDto: CreateRoleDto) {
		return new RoleEntity(await this.rolesService.create(createRoleDto, req.user.id));
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: RoleEntity, isArray: true })
	async findAll(@Request() req) {
		const roles = await this.rolesService.findAll(req.user.id);
		return roles.map((role) => new RoleEntity(role));
	}

	@Get(":id")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: RoleEntity })
	async findOne(@Param("id", ParseIntPipe) id: number) {
		return new UserEntity(await this.rolesService.findOne(+id));
	}

	@Get(":name")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: RoleEntity })
	async findOneByName(@Param("name") name: string) {
		return new UserEntity(await this.rolesService.findOneByName(name));
	}

	@Patch(":id")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: RoleEntity })
	async update(
		@Request() req,
		@Param("id", ParseIntPipe) id: number,
		@Body() updateRoleDto: UpdateRoleDto
	) {
		return new RoleEntity(
			await this.rolesService.update(+id, updateRoleDto, req.user.id)
		);
	}

	@Delete(":id")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: RoleEntity })
	async remove(@Request() req, @Param("id", ParseIntPipe) id: number) {
		return new RoleEntity(await this.rolesService.remove(+id, req.user.id));
	}
}
