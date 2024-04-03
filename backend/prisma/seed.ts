// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const contact1 = await prisma.contact.upsert({
    where: { email: 'test1@test.com' },
    update: {},
    create: {
      firstName: 'Test1',
      lastName: 'Test1',
      title: 'CEO',
      phoneNumber: '0123456789',
	  email: 'test1@test.com',
	  company: 'TechSolutions Inc.',
	  location: 'Milano, Italy',
	  isExternal: false,
	  notes: 'Contatto di Test',
    },
  });

  const contact2 = await prisma.contact.upsert({
    where: { email: "test2@test.com" },
    update: {},
    create: {
		firstName: 'Test2',
		lastName: 'Test2',
		title: 'Developer',
		phoneNumber: '9876543210',
		email: 'test2@test.com',
		company: 'TechSolutions Inc.',
		location: 'Milano, Italy',
		isExternal: false,
		notes: 'Contatto di Test',
    },
  });

  console.log({ contact1, contact2 });
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
