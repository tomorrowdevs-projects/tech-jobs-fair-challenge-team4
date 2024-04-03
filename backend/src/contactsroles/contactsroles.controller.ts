import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
  ParseIntPipe,
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
	@ApiOperation({ summary: "Get all Contacts with RoleId" })
	FindAllContacstWithRole(@Param("roleId", ParseIntPipe) roleId: number) {
		return this.contactsrolesService.findAllContactsWithRole(roleId);
	}

	@Get(":roleIds")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: ContactEntity, isArray: true })
	@ApiOperation({ summary: "Get all Contacts with RoleIds" })
	FindAllContactsWithRoles(@Param("roleIds", ParseIntPipe) roleIds: number[]) {
		return this.contactsrolesService.findAllContactsWithRoles(roleIds);
	}

	@Get(":contactId")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: Contactsrole, isArray: true })
	@ApiOperation({ summary: "Get all Roles of ContactId" })
	FindAllRolesofContact(@Param("contactId", ParseIntPipe) contactId: number) {
		return this.contactsrolesService.findAllRolesOfContact(contactId);
	}

	@Patch("/role/:roleId/contact/:contactId")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiCreatedResponse({ type: Contactsrole })
	UpdateRoleToContact(
		@Param("roleId", ParseIntPipe) roleId: number,
		@Param("contactId", ParseIntPipe) contactId: number,
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
		@Param("roleId", ParseIntPipe) roleId: number,
		@Param("contactId", ParseIntPipe) contactId: number
	) {
		return this.contactsrolesService.remove(roleId, contactId);
	}
}
