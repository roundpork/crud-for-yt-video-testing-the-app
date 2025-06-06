import express from 'express';
import { PrismaClient } from './generated/prisma';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/pigs', async (req, res) => {
	const pigs = await prisma.pig.findMany();
	res.json(pigs);
});

app.get('/pigs/:id', async (req, res) => {
	const pig = await prisma.pig.findUnique({
		where: { id: Number(req.params.id) }
	});
	pig ? res.json(pig) : res.status(404).json({ error: 'Not found' });
});

app.post('/pigs', async (req, res) => {
	const { name, age, breed } = req.body;
	const pig = await prisma.pig.create({ data: { name, age, breed } });
	res.status(201).json(pig);
});

app.put('/pigs/:id', async (req, res) => {
	const { name, age, breed } = req.body;
	const pig = await prisma.pig.update({
		where: { id: Number(req.params.id) },
		data: { name, age, breed }
	});
	res.json(pig);
});

app.delete('/pigs/:id', async (req, res) => {
	await prisma.pig.delete({ where: { id: Number(req.params.id) } });
	res.status(204).send();
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
