export async function fetchRooms() {
    const response = await fetch("/api/rooms");

    if (!response.ok) {
        throw new Error("Failed to fetch rooms")
    };

    return response.json();
}