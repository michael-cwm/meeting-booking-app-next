// export function getAvailableSlots(
//     bookings: { hour: number }[],
//     startHour = 8,
//     endHour = 15
// ) {
//     const bookedHours = bookings.map(b => b.hour)
//     const slots = []
//     for (let h = startHour; h < endHour; h++) {
//         if (!bookedHours.includes(h)) {
//             slots.push({
//                 hour: h,
//                 label: `${h.toString().padStart(2, "0")}:00–${(h + 1)
//                     .toString()
//                     .padStart(2, "0")}:00`,
//             })
//         }
//     }
//     return slots
// }

import { Slot } from "app/types/Availability";

export function getAvailableSlots(
    bookings: { hour: number }[],
    date: string,
    roomId: number,
    roomName: string,
    capacity: number,
    startHour = 8,
    endHour = 15
): Slot[] {
    const bookedHours = bookings.map(b => b.hour);
    const slots: Slot[] = [];

    for (let h = startHour; h < endHour; h++) {
        if (!bookedHours.includes(h)) {
            slots.push({
                date,
                roomId,
                roomName,
                capacity,
                hour: h,
                label: `${h.toString().padStart(2, "0")}:00–${(h + 1)
                    .toString()
                    .padStart(2, "0")}:00`,
            });
        }
    }

    return slots;
}

