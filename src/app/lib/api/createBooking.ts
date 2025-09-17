interface CreateBookingInput {
    roomId: number;
    date: string;
    hour: number;
    name: string;
}

export async function createBooking(input: CreateBookingInput) {
    const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });

    if (!response.ok) {
        throw new Error("Failed to create booking");
    }

    return response.json();
}