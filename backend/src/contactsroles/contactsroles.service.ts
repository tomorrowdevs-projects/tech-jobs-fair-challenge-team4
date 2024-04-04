import { Injectable } from "@nestjs/common";
import { CreateContactsroleDto } from "./dto/create-contactsrole.dto";
import { UpdateContactsroleDto } from "./dto/update-contactsrole.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class ContactsrolesService {
	constructor(
		private prisma: PrismaService,
		private userService: UsersService
	) {}

	async addRoleToContact(
		contactRoleDto: CreateContactsroleDto,
		userId: number
	) {
		if (await this.userService.isContactManager(userId))
			return this.prisma.contactRole.create({
				data: contactRoleDto,
			});
		return null;
	}

	async findAllContactsWithRoles(roleIds: number[], userId: number) {
		if (!(await this.userService.canRead(userId))) return null;

		const contactRoles = await this.prisma.contactRole.findMany({
			where: {
				roleId: {
					in: roleIds,
				},
			},
			include: {
				contact: true,
			},
		});

		const contactsMap = new Map();
		contactRoles.forEach((cr) => {
			if (cr.contact && !contactsMap.has(cr.contact.id)) {
				contactsMap.set(cr.contact.id, cr.contact);
			}
		});

		return Array.from(contactsMap.values());
	}

	async findAllContactsWithRole(roleId: number, userId: number) {
		const userRole = await this.userService.findMyRole(userId);
		if (
			!(await this.userService.isContactManager(userId)) ||
			!userRole ||
			userRole.id != roleId ||
			!(await this.userService.canRead(userId))
		)
			return null;

		const contactsRoles = await this.prisma.contactRole.findMany({
			where: {
				roleId: roleId,
			},
			include: {
				contact: true,
			},
		});
		return contactsRoles.map((cr) => cr.contact).filter(Boolean);
	}

	findAllContactsWithoutRoles() {
		return this.prisma.contact.findMany({
			where: {
				roles: {
					none: {},
				},
			},
		});
	}

	async findAllRolesOfContact(contactId: number, userId: number) {
		if (
			!(await this.userService.isContactManager(userId)) &&
			!(await this.userService.canRead(userId))
		)
			return null;
		return this.prisma.contactRole.findMany({
			where: {
				roleId: contactId,
			},
			include: {
				contact: true,
				role: true,
			},
		});
	}

	async updateRoleOfContact(
		contactId: number,
		roleId: number,
		contactRoleDto: UpdateContactsroleDto,
		userId: number
	) {
		if (!(await this.userService.isContactManager(userId))) return null;
		return this.prisma.contactRole.update({
			where: {
				contactId_roleId: {
					contactId: contactId,
					roleId: roleId,
				},
			},
			data: contactRoleDto,
		});
	}

	async remove(contactId: number, roleId: number, userId: number) {
		if (
			!(await this.userService.isContactManager(userId)) &&
			!(await this.userService.canDelete(userId))
		)
			return null;
		return this.prisma.contactRole.delete({
			where: {
				contactId_roleId: {
					contactId: contactId,
					roleId: roleId,
				},
			},
		});
	}
}
