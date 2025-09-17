
This project uses **Next.js**, **Prisma**, and **SQLite**.  


# Getting Started

```bash
npm install
npm run dev
```

The app should now be running at http://localhost:3000.

If prisma/dev.db is missing or you want to reset the database:

```bash
npx prisma migrate dev --name init
```

The database is seeded automatically on first run.

