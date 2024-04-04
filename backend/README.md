# Running the Backend

To run the backend, follow these steps:

1. Build and start the Docker containers:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

2. Open a shell in the nestjs-dev-app container:

```bash
docker exec -it "nestjs-dev-app" sh
```

3. Run the Prisma migrations:

```bash
npx prisma migrate dev
```

4. Generate the Prisma client:

```bash
npx prisma generate
```

5. Seed the database:

```bash
npx prisma db seed
```

6. Access the API at `http://localhost:3000/api`
and Login with `admin@admin.com` `admin1234`.
