// import { NextResponse } from "next/server"
// import { prisma } from "@lib/api/prisma"
// import { startOfDay, endOfDay } from "date-fns"
// import { getAvailableSlots } from "@lib/api/getAvailableSlots"
// import { seedRooms } from "@lib/api/seedRooms"


// export async function GET(req: Request) {
//     await seedRooms()
//     const { searchParams } = new URL(req.url)
//     const datesParam = searchParams.get("dates")
//     const nameFilters = searchParams.getAll("name");

//     if (!datesParam) {
//         return NextResponse.json(
//             { error: "Missing ?dates=YYYY-MM-DD[,YYYY-MM-DD...]" },
//             { status: 400 }
//         )
//     }

//     const dates = datesParam.split(",").map(d => new Date(d))

//     const rooms = await prisma.room.findMany({
//         where: nameFilters.length > 0
//             ? {
//                 OR: nameFilters.map(name => ({ name: { contains: name } }))
//             }
//             : {},
//     });

//     if (rooms.length === 0) {
//         return NextResponse.json({})
//     }

//     const minDate = startOfDay(dates[0])
//     const maxDate = endOfDay(dates[dates.length - 1])

//     const bookings = await prisma.booking.findMany({
//         where: {
//             date: {
//                 gte: minDate,
//                 lte: maxDate,
//             },
//         },
//     })


//     const result: Record<string, any[]> = {}

//     for (const date of dates) {
//         const dayStart = startOfDay(date)
//         const dayEnd = endOfDay(date)

//         result[date.toISOString().slice(0, 10)] = rooms.map(room => {
//             const roomBookings = bookings.filter(
//                 b => b.roomId === room.id && b.date >= dayStart && b.date <= dayEnd
//             )
//             const slots = getAvailableSlots(roomBookings)
//             return {
//                 roomId: room.id,
//                 roomName: room.name,
//                 capacity: room.capacity,
//                 slots,
//             }
//         })
//     }

//     return NextResponse.json(result)
// }

import { NextResponse } from "next/server";
import { prisma } from "@lib/api/prisma";
import { startOfDay, endOfDay } from "date-fns";
import { getAvailableSlots } from "@lib/api/getAvailableSlots";
import { seedRooms } from "@lib/api/seedRooms";
import { AvailabilityResult, RoomAvailability } from "app/types/Availability";

export async function GET(req: Request) {
    await seedRooms();
    const { searchParams } = new URL(req.url);
    const datesParam = searchParams.get("dates");
    const nameFilters = searchParams.getAll("name");

    if (!datesParam) {
        return NextResponse.json(
            { error: "Missing ?dates=YYYY-MM-DD[,YYYY-MM-DD...]" },
            { status: 400 }
        );
    }

    const dates = datesParam.split(",").map(d => new Date(d));

    const rooms = await prisma.room.findMany({
        where:
            nameFilters.length > 0
                ? { OR: nameFilters.map(name => ({ name: { contains: name } })) }
                : {},
    });

    if (rooms.length === 0) {
        return NextResponse.json({});
    }

    const minDate = startOfDay(dates[0]);
    const maxDate = endOfDay(dates[dates.length - 1]);

    const bookings = await prisma.booking.findMany({
        where: {
            date: { gte: minDate, lte: maxDate },
        },
    });

    const result: AvailabilityResult = {};

    for (const date of dates) {
        const dateKey = date.toISOString().slice(0, 10);
        const dayStart = startOfDay(date);
        const dayEnd = endOfDay(date);

        result[dateKey] = rooms.map<RoomAvailability>(room => {
            const roomBookings = bookings.filter(
                b => b.roomId === room.id && b.date >= dayStart && b.date <= dayEnd
            );

            const slots = getAvailableSlots(
                roomBookings,
                dateKey,
                room.id,
                room.name,
                room.capacity
            );

            return {
                roomId: room.id,
                roomName: room.name,
                capacity: room.capacity,
                slots,
            };
        });
    }

    return NextResponse.json(result);
}


