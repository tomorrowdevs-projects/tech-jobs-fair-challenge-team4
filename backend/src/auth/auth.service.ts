//src/auth/auth.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService, private usersService: UsersService) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    // Step 1: Fetch a user with the given email
    const currentUser = await this.prisma.user.findUnique({ where: { email: email } });
    const roleManager = await this.usersService.isRoleManager(currentUser?.id);
    const contactManager = await this.usersService.isContactManager(currentUser?.id);
    const userManager = await this.usersService.isUserManager(currentUser?.id);
    const canRead = await this.usersService.canRead(currentUser?.id);
    const canWrite = await this.usersService.canWrite(currentUser?.id);
    const canDelete = await this.usersService.canDelete(currentUser?.id);
    const canUpdate = await this.usersService.canEdit(currentUser?.id);

    // If no user is found, throw an error
    if (!currentUser) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // Step 2: Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, currentUser.password);

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Step 3: Generate a JWT containing the user's ID and return it
    return {
      user: {
        id: currentUser.id,
        email: currentUser.email,
        name: currentUser.name,
        roleId: currentUser.roleId,
        roleManager,
        contactManager,
        userManager,
        canRead,
        canWrite,
        canDelete,
        canUpdate,
      },
      accessToken: this.jwtService.sign({ userId: currentUser.id }),
    };
  }
}
