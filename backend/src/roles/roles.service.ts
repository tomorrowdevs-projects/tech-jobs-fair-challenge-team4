import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class RolesService {
	constructor(private prisma: PrismaService, @Inject(forwardRef(() => UsersService)) private usersService: UsersService) {}

	async create(createRoleDto: CreateRoleDto, userId: number) {
		if (await this.usersService.isRoleManager(userId))
			return this.prisma.role.create({ data: createRoleDto });
		return null
	}

	findAll(userId: number) {
		return this.prisma.role.findMany();
	}

	findOne(id: number) {
		return this.prisma.role.findUnique({ where: { id } });
	}

	findOneByName(name: string) {
		return this.prisma.role.findUnique({ where: { name: name } });
	}

	async update(id: number, updateRoleDto: UpdateRoleDto, userId: number) {
		if (await this.usersService.isRoleManager(userId))
			return this.prisma.role.update({ where: { id }, data: updateRoleDto });
		return null;
	}

	async remove(id: number, userId: number) {
		if (await this.usersService.isRoleManager(userId))
			return this.prisma.role.delete({ where: { id } });
		return null;
	}
}
