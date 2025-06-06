import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

async function main() {
	const pig1 = await prisma.pig.upsert({
		where: { id: 1 },
		update: {},
		create: {
			name: 'Piggy',
			age: 2,
			breed: 'Yorkshire',
		},
	})
	const pig2 = await prisma.pig.upsert({
		where: { id: 2 },
		update: {},
		create: {
			name: 'Wilbur',
			age: 3,
			breed: 'Hampshire',
		},
	})
	console.log({ pig1, pig2 })
}
main()
	.then(() => prisma.$disconnect())
	.catch(async (e) => {
	console.error(e)
	await prisma.$disconnect()
	process.exit(1)
	})
