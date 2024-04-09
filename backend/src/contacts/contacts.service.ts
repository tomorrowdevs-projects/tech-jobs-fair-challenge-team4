import { Injectable } from "@nestjs/common";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class ContactsService {
	constructor(
		private prisma: PrismaService,
		private userService: UsersService
	) {}

	async create(createContactDto: CreateContactDto, userId: number) {
		if (
			(await this.userService.isContactManager(
				userId
			)) ||
			(await this.userService.canWrite(userId))
		)
			return this.prisma.contact.create({ data: createContactDto });
		return null;
	}

	async findAll(userId: number) {
		if (
			(await this.userService.canRead(userId)) ||
			(await this.userService.isContactManager(userId))
		)
			return this.prisma.contact.findMany();

		return null;
	}

	async findAllInternal(userId: number) {
		if (
			(await this.userService.canRead(userId)) ||
			(await this.userService.isContactManager(userId))
		)
			return this.prisma.contact.findMany({
				where: { isExternal: false },
			});
		return null;
	}

	async findAllExternal(userId: number) {
		if (
			(await this.userService.canRead(userId)) ||
			(await this.userService.isContactManager(userId))
		)
			return this.prisma.contact.findMany({
				where: { isExternal: true },
			});
		return null;
	}

	findOne(id: number, userID: number) {
		return this.prisma.contact.findUnique({
			where: { id },
		});
	}

	async update(
		id: number,
		updateContactDto: UpdateContactDto,
		userID: number
	) {
		if (
			(await this.userService.isContactManager(userID)) ||
			(await this.userService.canWrite(userID))
		)
			return this.prisma.contact.update({
				where: { id },
				data: updateContactDto,
			});
		return null;
	}

	async remove(id: number, userID: number) {
		if (
			(await this.userService.isContactManager(userID)) ||
			(await this.userService.canDelete(userID))
		)
			return this.prisma.contact.delete({ where: { id } });
		return null;
	}
}
