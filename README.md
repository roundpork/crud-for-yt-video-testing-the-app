# Steps taken to build this

## 1. init npm

```bash
npm init -y
```

## 2. get prisma

```bash
npm install prisma --save-dev
```

added 8 packages, and audited 9 packages in 19s

found 0 vulnerabilities

## 3. make prisma schema

```bash
npx prisma init
```

- Creates a new directory called prisma that contains a file called schema.prisma, which contains the Prisma Schema with your database connection variable and schema models.
- Creates a .env file in the root directory of the project, which is used for defining environment variables (such as your database connection and API keys).

Fetching latest updates for this subcommand...

✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.
5. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm

More information in our documentation:
https://pris.ly/d/getting-started

## 4. set DATABASE_URL in .env

```.env
DATABASE_URL="postgresql://postgres:pass123@localhost:5432/postgres?schema=public"
```

## 5. update the schema

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Pig {
	id		Int		@id @default(autoincrement())
	name		String
	age		Int
	breed		String
	createdAt	DateTime	@default(now())
	updatedAt	DateTime	@updatedAt
}
```

## 6. create docker yaml

```yaml
services:
  db:
    image: postgres
    restart: always
    ports:
      - '5432:5432'
    environment:
      POSTGRES_PASSWORD: pass123
```

## 8. start docker and read yaml to make containers

```bash
sudo systemctl start docker
docker-compose up -d
```

`-d` flag means demon

this is how to shutdown everything

```bash
#Stop and remove your Docker Compose containers
docker-compose down

#This stops Docker itself, so no Docker commands will work until you start it again.
sudo systemctl stop docker.service

#(Optional) Remove leftover containers/images if you want to clean all traces
docker container prune -f
docker image prune -a -f

#Or clean everything at once (warning: deletes all stopped containers, unused images, networks, and volumes)
docker system prune -a --volumes -f
```

[+] Running 15/15
 ✔ db Pulled                                                                                                                                                                                                                                                              112.2s
   ✔ 61320b01ae5e Pull complete                                                                                                                                                                                                                                            82.0s
   ✔ 3db9b37be7c3 Pull complete                                                                                                                                                                                                                                            82.1s
   ✔ e9a82aed48d7 Pull complete                                                                                                                                                                                                                                            82.2s
   ✔ 7c852ebdd63e Pull complete                                                                                                                                                                                                                                            82.3s
   ✔ 28708ff4e046 Pull complete                                                                                                                                                                                                                                            82.7s
   ✔ 6ce13d85dabe Pull complete                                                                                                                                                                                                                                            82.7s
   ✔ bd1fa28722bb Pull complete                                                                                                                                                                                                                                            82.7s
   ✔ 410cd7ec9a40 Pull complete                                                                                                                                                                                                                                            82.7s
   ✔ 475b0e32b814 Pull complete                                                                                                                                                                                                                                           106.2s
   ✔ e7aba16d6a5e Pull complete                                                                                                                                                                                                                                           106.2s
   ✔ 89ba8b615fa9 Pull complete                                                                                                                                                                                                                                           106.2s
   ✔ 82697a7976df Pull complete                                                                                                                                                                                                                                           106.2s
   ✔ 7e11eb1421f3 Pull complete                                                                                                                                                                                                                                           106.2s
   ✔ 2bb588ce4e67 Pull complete                                                                                                                                                                                                                                           106.2s
[+] Running 2/2
 ✔ Network crud-for-yt-video-testing-the-app_default  Created                                                                                                                                                                                                               0.1s
 ✔ Container crud-for-yt-video-testing-the-app-db-1   Started                                                                                                                                                                                                               0.2s

## 7. migrate schema

```bash
npx prisma db push
```

Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "postgres", schema "public" at "localhost:5432"

🚀  Your database is now in sync with your Prisma schema. Done in 45ms

Running generate... (Use --skip-generate to skip the generators)

✔ Generated Prisma Client (v6.9.0) to ./generated/prisma in 36ms

## 8. generate prisma client

```bash
npx prisma generate
```

## 8. see table visually

```bash
npx prisma studio
```

Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Prisma Studio is up on http://localhost:5555
Prisma schema loaded from prisma/schema.prisma

## 9. get TypeScript and node type

```bash
npm install typescript tsx @types/node --save-dev
```

added 8 packages, and audited 84 packages in 8s

16 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

## 10. init TypeScript

```bash
npx tsc --init
```

Created a new tsconfig.json with:
                                                                                                                     TS
  target: es2016
  module: commonjs
  strict: true
  esModuleInterop: true
  skipLibCheck: true
  forceConsistentCasingInFileNames: true


You can learn more at https://aka.ms/tsconfig

## 11. seed

Add script seed

```json
{
	"prisma": {
		"seed": "tsx seed.ts"	
	},
  "name": "crud-for-yt-video-testing-the-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git@github.com-roundpork:roundpork/crud-for-yt-video-testing-the-app.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "@types/node": "^22.15.30",
    "prisma": "^6.9.0",
    "tsx": "^4.19.4",
    "typescript": "^5.8.3"
  },
  "dependencies": {
    "@prisma/client": "^6.9.0",
    "express": "^5.1.0"
  }
}
```

Add the implementation

```ts
import { PrismaClient } from '@prisma/client'

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
```

Run the seed command and see result

```bash
npx prisma db seed
```

## 9. get express

```bash
npm i express
```

added 66 packages, and audited 76 packages in 2s

14 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

## 10. make index.ts

```ts
import express from 'express';
import { PrismaClient } from '../generated/prisma';

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
```

## 11. Add index.ts script and run

```json
{
	"prisma": {
		"seed": "tsx seed.ts"	
	},
  "name": "crud-for-yt-video-testing-the-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
	"dev": "tsx index.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git@github.com-roundpork:roundpork/crud-for-yt-video-testing-the-app.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "@types/node": "^22.15.30",
    "prisma": "^6.9.0",
    "tsx": "^4.19.4",
    "typescript": "^5.8.3"
  },
  "dependencies": {
    "@prisma/client": "^6.9.0",
    "express": "^5.1.0"
  }
}
```

run it

```bash
npm run dev
```

## 12. get cli client

```bash
sudo pacman -S httpie
```

## 13. use clie client to test endpoints

This is the syntax

```
http [flags] [METHOD] URL [ITEM [ITEM]]
```

* If you don’t specify METHOD, it defaults to GET.
* ITEMS are key=value pairs for JSON body or headers.


### 1. **GET all pigs**

```bash
http GET http://localhost:3000/pigs
```

---

### 2. **GET a pig by id (e.g., id=1)**

```bash
http GET http://localhost:3000/pigs/1
```

---

### 3. **POST create a new pig**

Example: create pig with name=“Porky”, age=3, breed=“Yorkshire”

```bash
http POST http://localhost:3000/pigs name=Porky age:=3 breed=Yorkshire
```

Note:

* Use `:=` to send numbers instead of strings for `age`.
* Key=value pairs form JSON body.

---

### 4. **PUT update an existing pig (id=1)**

Update name, age, breed:

```bash
http PUT http://localhost:3000/pigs/1 name=Hamlet age:=4 breed=“Berkshire”
```

---

### 5. **DELETE a pig (id=1)**

```bash
http DELETE http://localhost:3000/pigs/1
```

http GET http://localhost:3000/pigs/1
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 136
Content-Type: application/json; charset=utf-8
Date: Fri, 06 Jun 2025 17:52:25 GMT
ETag: W/"88-bMzO4KhD3xhBF6Lr6qTLkQevzY4"
Keep-Alive: timeout=5
X-Powered-By: Express

{
    "age": 4,
    "breed": "“Berkshire”",
    "createdAt": "2025-06-06T17:18:19.191Z",
    "id": 1,
    "name": "Hamlet",
    "updatedAt": "2025-06-06T17:52:10.255Z"
}

## 15. Get eslint antfu

should be enough to cover both prettier and eslint

```bash
npm install --save-dev eslint @antfu/eslint-config
```

## 16. add husky and lint-staged

1. husky will decide what to run on commit, tell it to run lint staged
2. lint staged targets staged files, tell it to do gts fix and git add to them

Get husky and lint-staged
```bash
npm install --save-dev husky lint-staged
```

Tell husky to create its config file (.husky/pre-commit)
```bash
npx husky init
```

config husky to run lint-staged
```
npx lint-staged
```

tell lint-staged what to do on staged files in package.json
```json
{
  "lint-staged": {
    "*.{ts,tsx}": "eslint --fix"
  },
  "prisma": {
    "seed": "tsx seed.ts"
  },
  "name": "crud-for-yt-video-testing-the-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "dev": "tsx index.ts",
    "test": "echo \"Error: no test specified\" && exit 1",
    "lint": "gts lint",
    "clean": "gts clean",
    "compile": "tsc",
    "fix": "gts fix",
    "prepare": "husky",
    "pretest": "npm run compile",
    "posttest": "npm run lint"
  },
  "repository": {
    "type": "git",
    "url": "git@github.com-roundpork:roundpork/crud-for-yt-video-testing-the-app.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "@types/node": "^22.15.30",
    "husky": "^9.1.7",
    "lint-staged": "^16.1.0",
    "prisma": "^6.9.0",
    "tsx": "^4.19.4",
    "typescript": "^5.8.3"
  },
  "dependencies": {
    "@prisma/client": "^6.9.0",
    "express": "^5.1.0"
  }
}
```

