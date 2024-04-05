// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

export const roundsOfHashing = 10;

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
	const adminRole = await prisma.role.upsert({
		where: { name: "Admin" },
		update: {},
		create: {
			name: "Admin",
			deleting: true,
			editing: true,
			reading: true,
			roleManagement: true,
			userManagement: true,
			contactManagement: true,
			writing: true,
		},
	});

	const toAssign = await prisma.role.upsert({
		where: { name: "ToAssign" },
		update: {},
		create: {
			name: "ToAssign",
			deleting: false,
			editing: false,
			reading: true,
			roleManagement: false,
			userManagement: false,
			contactManagement: false,
			writing: false,
		},
	});

	const developerRole = await prisma.role.upsert({
		where: { name: "Developer" },
		update: {},
		create: {
			name: "Developer",
			deleting: false,
			editing: false,
			reading: true,
			roleManagement: false,
			userManagement: false,
			contactManagement: false,
			writing: false,
		},
	});

	const projectManagerRole = await prisma.role.upsert({
		where: { name: "Project Manager" },
		update: {},
		create: {
			name: "Project Manager",
			deleting: false,
			editing: true,
			reading: true,
			roleManagement: true,
			userManagement: true,
			contactManagement: true,
			writing: true,
		},
	});

	const hashedPassword = await bcrypt.hash("admin1234", roundsOfHashing);

	const adminUser = await prisma.user.upsert({
		where: { email: "admin@admin.com" },
		update: {
			email: "admin@admin.com",
			name: "Admin",
			password: hashedPassword,
			roleId: adminRole.id,
		},
		create: {
			email: "admin@admin.com",
			name: "Admin",
			password: hashedPassword,
			roleId: adminRole.id,
		},
	});

  const contactExample1 = await prisma.contact.upsert({
    where: { email: "john.doe@example.com" },
    update: {},
    create: {
      firstName: "John",
      lastName: "Doe",
      title: "Mr.",
      phoneNumber: "+1234567890",
      email: "john.doe@example.com",
      telegram: "johndoe",
      linkedin: "johndoe",
      department: "IT",
      company: "Example Inc.",
      vatNumber: "123456789",
      location: "New York",
      isExternal: false,
    }
  })

  const contactExample2 = await prisma.contact.upsert({
    where: { email: "franco.neri@example.com" },
    update: {},
    create: {
      firstName: "Franco",
      lastName: "Neri",
      title: "Mr.",
      phoneNumber: "+391234567891",
      email: "franco.neri@example.com",
      telegram: "francon",
      linkedin: "franconeri",
      department: "HR",
      company: "Neri Solutions",
      vatNumber: "987657321",
      location: "Naples",
      isExternal: false,
    }
  })

  const contactExample3 = await prisma.contact.upsert({
    where: { email: "chiara.blu@example.org" },
    update: {},
    create: {
      firstName: "Chiara",
      lastName: "Blu",
      title: "Dr.",
      phoneNumber: "+391234567892",
      email: "chiara.blu@example.org",
      telegram: "chiarablu",
      linkedin: "chiarablu",
      department: "Product Development",
      company: "Innovatech Solutions",
      vatNumber: "123456780",
      location: "Venice",
      isExternal: true,
    }
  })

  const contactExample4 = await prisma.contact.upsert({
    where: { email: "luca.verde@example.com" },
    update: {},
    create: {
      firstName: "Luca",
      lastName: "Verde",
      title: "Mr.",
      phoneNumber: "+391234567893",
      email: "luca.verde@example.com",
      telegram: "lucaverde",
      linkedin: "lucaverde",
      department: "Customer Support",
      company: "Verde & Associates",
      vatNumber: "987654322",
      location: "Florence",
      isExternal: false,
    }
  })

  const contactExample5 = await prisma.contact.upsert({
    where: { email: "sara.gialli@example.net" },
    update: {},
    create: {
      firstName: "Sara",
      lastName: "Gialli",
      title: "Ms.",
      phoneNumber: "+391234567894",
      email: "sara.gialli@example.net",
      telegram: "saragialli",
      linkedin: "saragialli",
      department: "Finance",
      company: "Gialli Finance",
      vatNumber: "123456781",
      location: "Bologna",
      isExternal: true,
    }
  })

  const contactExample6 = await prisma.contact.upsert({
    where: { email: "laura.rossi@example.com" },
    update: {},
    create: {
      firstName: "Laura",
      lastName: "Rossi",
      title: "Ms.",
      phoneNumber: "+391234567890",
      email: "laura.rossi@example.com",
      telegram: "larossi",
      linkedin: "laurarossi",
      department: "Marketing",
      company: "Rossi Enterprises",
      vatNumber: "987654321",
      location: "Milan",
      isExternal: true,
    }
  })

  const contactExample7 = await prisma.contact.upsert({
    where: { email: "mario.bianchi@example.net" },
    update: {},
    create: {
      firstName: "Mario",
    lastName: "Bianchi",
    title: "Dr.",
    phoneNumber: "+395678901234",
    email: "mario.bianchi@example.net",
    telegram: "mariob",
    linkedin: "mariobianchi",
    department: "Research",
    company: "Bianchi Innovations",
    vatNumber: "123123123",
    location: "Rome",
    isExternal: false,
  }
  })

  const contactExample8 = await prisma.contact.upsert({
    where: { email: "giulia.verdi@example.it" },
    update: {},
    create: {
      firstName: "Giulia",
      lastName: "Verdi",
      title: "Mrs.",
      phoneNumber: "+391112223334",
      email: "giulia.verdi@example.it",
      telegram: "giuliav",
      linkedin: "giuliaverdi",
      department: "Sales",
      company: "Verdi Corp",
      vatNumber: "321321321",
      location: "Turin",
      isExternal: true,
    }
  })
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
