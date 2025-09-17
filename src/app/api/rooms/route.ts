import { NextResponse } from "next/server";
import { prisma } from "@lib/api/prisma";
import { seedRooms } from "@lib/api/seedRooms";

export async function GET() {
    await seedRooms()

    const rooms = await prisma.room.findMany({
        select: { id: true, name: true, capacity: true },
    });
    return NextResponse.json(rooms);
}