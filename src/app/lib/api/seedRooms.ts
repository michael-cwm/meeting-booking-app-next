import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function seedRooms() {

    const roomCount = await prisma.room.count()

    if (roomCount > 0) return

    await prisma.room.createMany({
        data: [
            { name: "Margret", capacity: 4 },
            { name: "Steve", capacity: 6 },
            { name: "Ada", capacity: 10 },
            { name: "Edmund", capacity: 10 },
            { name: "Grace", capacity: 20 },
        ]
    })

    console.log("Rooms seeded")
}

