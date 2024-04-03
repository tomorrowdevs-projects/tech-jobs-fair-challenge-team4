import { Injectable } from "@nestjs/common";
import { CreateContactsroleDto } from "./dto/create-contactsrole.dto";
import { UpdateContactsroleDto } from "./dto/update-contactsrole.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ContactsrolesService {
	constructor(private prisma: PrismaService) {}

	addRoleToContact(contactRoleDto: CreateContactsroleDto) {
		return this.prisma.contactRole.create({
			data: contactRoleDto,
		});
	}

	async findAllContactsWithRoles(roleIds: number[]) {
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

	async findAllContactsWithRole(roleId: number) {
		const contactsRoles = await this.prisma.contactRole.findMany({
			where: {
				roleId: roleId,
			},
			include: {
				contact: true,
			},
		});
    return contactsRoles.map(cr => cr.contact).filter(Boolean);
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

	findAllRolesOfContact(contactId: number) {
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

	updateRoleToContact(
		contactId: number,
		roleId: number,
		contactRoleDto: UpdateContactsroleDto
	) {
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

	remove(contactId: number, roleId: number) {
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
