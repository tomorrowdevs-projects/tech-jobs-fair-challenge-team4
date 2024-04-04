import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";

export class RoleEntity implements Role {
	constructor(partial: Partial<RoleEntity> | null) {
		Object.assign(this, partial);
	}

	@ApiProperty()
	id: number;

	@ApiProperty()
	name: string;

	@ApiProperty()
	roleManagement: boolean;

	@ApiProperty()
	userManagement: boolean;

	@ApiProperty()
	contactManagement: boolean;

	@ApiProperty()
	deleting: boolean;

	@ApiProperty()
	writing: boolean;

	@ApiProperty()
	editing: boolean;

	@ApiProperty()
	reading: boolean;
}
