// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {

  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
      deleting: true,
      editing: true,
      reading: true,
      roleManagement: true,
      userManagement: true,
      contactManagement: true,
      writing: true,
    }
  });

  const toAssign = await prisma.role.upsert({
    where: { name: 'ToAssign' },
    update: {},
    create: {
      name: 'ToAssign',
      deleting: false,
      editing: false,
      reading: true,
      roleManagement: false,
      userManagement: false,
      contactManagement: false,
      writing: false,
    }
  });

  const hashedPassword = await bcrypt.hash(
    'admin1234',
    roundsOfHashing
  );

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {
      email: 'admin@admin.com',
      name: 'Admin',
      password: hashedPassword,
      roleId: adminRole.id,
    },
    create: {
      email: 'admin@admin.com',
      name: 'Admin',
      password: hashedPassword,
      roleId: adminRole.id,
    }});

  console.log({ adminRole, toAssign, adminUser });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
