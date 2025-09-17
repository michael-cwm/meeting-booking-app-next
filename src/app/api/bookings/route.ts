import { NextResponse } from "next/server";
import { prisma } from "@lib/api/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { roomId, date, hour, name } = body;

        if (!roomId || !date || !hour || !name) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const booking = await prisma.booking.create({
            data: {
                roomId: Number(roomId),
                date: new Date(date),
                hour: Number(hour),
                name: String(name)
            },
        });

        return NextResponse.json(booking, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
    }
}
