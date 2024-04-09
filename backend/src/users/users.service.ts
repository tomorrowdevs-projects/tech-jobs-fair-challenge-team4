import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolesService } from 'src/roles/roles.service';

import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, @Inject(forwardRef(() => RolesService)) private rolesService: RolesService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing
    );

    createUserDto.password = hashedPassword;
    createUserDto.roleId = ( await this.rolesService.findOneByName('ToAssign'))?.id;
    return this.prisma.user.create({ data: createUserDto });
  }

  async findAll(userId) {
    if (await this.isUserManager(userId))
      return this.prisma.user.findMany();
    return null
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findMyRole(userId) {
		return this.prisma.user.findUnique({ where: { id: userId } });
	}

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing
      );
    }
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async assignRole(id: number, roleId: number) {
    if (await this.isUserManager(id))
      return this.prisma.user.update({
        where: { id },
        data: {
          roleId,
        },
      });
    return null;
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  async isRoleManager(userId) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.roleId)
      return false;
    const role = await this.rolesService.findOne(user.roleId);
    return role?.roleManagement;
  }

  async isUserManager(userId) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.roleId)
      return false;
    const role = await this.rolesService.findOne(user.roleId);
    return role?.userManagement;
  }

  async isContactManager(userId) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.roleId)
      return false;
    const role = await this.rolesService.findOne(user.roleId);
    return role?.userManagement;
  }

  async canWrite(userId) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.roleId)
      return false;
    const role = await this.rolesService.findOne(user.roleId);
    return role?.writing;
  }

  async canRead(userId) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.roleId)
      return false;
    const role = await this.rolesService.findOne(user.roleId);
    return role?.reading;
  }

  async canEdit(userId) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.roleId)
      return false;
    const role = await this.rolesService.findOne(user.roleId);
    return role?.editing;
  }

  async canDelete(userId) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.roleId)
      return false;
    const role = await this.rolesService.findOne(user.roleId);
    return role?.deleting;
  }
}
