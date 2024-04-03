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
	Request,
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
	addRoleToContact(@Request() req, @Body() createContactsroleDto: CreateContactsroleDto) {
		return this.contactsrolesService.addRoleToContact(
			createContactsroleDto,
			req.user.id
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
	FindAllContacstWithRole(
		@Request() req,
		@Param("roleId", ParseIntPipe) roleId: number
	) {
		return this.contactsrolesService.findAllContactsWithRole(
			roleId,
			req.user.id
		);
	}

	@Get(":roleIds")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: ContactEntity, isArray: true })
	@ApiOperation({ summary: "Get all Contacts with RoleIds" })
	FindAllContactsWithRoles(
		@Request() req,
		@Param("roleIds", ParseIntPipe) roleIds: number[]
	) {
		return this.contactsrolesService.findAllContactsWithRoles(
			roleIds,
			req.user.id
		);
	}

	@Get(":contactId")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOkResponse({ type: Contactsrole, isArray: true })
	@ApiOperation({ summary: "Get all Roles of ContactId" })
	FindAllRolesofContact(
		@Request() req,
		@Param("contactId", ParseIntPipe) contactId: number
	) {
		return this.contactsrolesService.findAllRolesOfContact(
			contactId,
			req.user.id
		);
	}

	@Patch("/role/:roleId/contact/:contactId")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiCreatedResponse({ type: Contactsrole })
	UpdateRoleToContact(
		@Request() req,
		@Param("roleId", ParseIntPipe) roleId: number,
		@Param("contactId", ParseIntPipe) contactId: number,
		@Body() updateContactsroleDto: UpdateContactsroleDto
	) {
		return this.contactsrolesService.updateRoleOfContact(
			roleId,
			contactId,
			updateContactsroleDto,
			req.user.id
		);
	}

	@Delete("/role/:roleId/contact/:contactId")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiCreatedResponse({ type: Contactsrole })
	remove(
		@Request() req,
		@Param("roleId", ParseIntPipe) roleId: number,
		@Param("contactId", ParseIntPipe) contactId: number
	) {
		return this.contactsrolesService.remove(roleId, contactId, req.user.id);
	}
}
