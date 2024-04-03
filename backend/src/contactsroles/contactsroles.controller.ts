import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
} from "@nestjs/common";
import { ContactsrolesService } from "./contactsroles.service";
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiTags,
	ApiOperation,
} from "@nestjs/swagger";
import { CreateContactsroleDto } from "./dto/create-contactsrole.dto";
import { UpdateContactsroleDto } from "./dto/update-contactsrole.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Contactsrole } from "./entities/contactsrole.entity";
import { ContactEntity } from "../contacts/entities/contact.entity";

@Controller("contactsroles")
@ApiTags("contacts roles")
export class ContactsrolesController {
	constructor(private readonly contactsrolesService: ContactsrolesService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiCreatedResponse({ type: Contactsrole })
	addRoleToContact(@Body() createContactsroleDto: CreateContactsroleDto) {
		return this.contactsrolesService.addRoleToContact(
			createContactsroleDto
		);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: ContactEntity, isArray: true })
	@ApiOperation({ summary: "Get all Contacts without Roles" })
	FindAllContactsWithoutRoles() {
		return this.contactsrolesService.findAllContactsWithoutRoles();
	}

	@Get(":roleId")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: ContactEntity, isArray: true })
	FindAllContacstWithRole(@Param("roleId") roleId: number) {
		return this.contactsrolesService.findAllContactsWithRole(roleId);
	}

	@Get(":roleIds")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: ContactEntity, isArray: true })
	FindAllContactsWithRoles(@Param("roleIds") roleIds: number[]) {
		return this.contactsrolesService.findAllContactsWithRoles(roleIds);
	}

	@Get(":contactId")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: Contactsrole })
	FindAllRolesofContact(@Param("contactId") contactId: number) {
		return this.contactsrolesService.findAllRolesOfContact(contactId);
	}

	@Patch("/role/:roleId/contact/:contactId")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiCreatedResponse({ type: Contactsrole })
	UpdateRoleToContact(
		@Param("roleId") roleId: number,
		@Param("contactId") contactId: number,
		@Body() updateContactsroleDto: UpdateContactsroleDto
	) {
		return this.contactsrolesService.updateRoleToContact(
			roleId,
			contactId,
			updateContactsroleDto
		);
	}

	@Delete("/role/:roleId/contact/:contactId")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiCreatedResponse({ type: Contactsrole })
	remove(
		@Param("roleId") roleId: number,
		@Param("contactId") contactId: number
	) {
		return this.contactsrolesService.remove(roleId, contactId);
	}
}
