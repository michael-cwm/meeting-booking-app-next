import { AvailabilityResult } from "../../types/Availability";

export const fetchAvailability = async (
    dates: string[],
    names?: string[]
): Promise<AvailabilityResult> => {
    const params = new URLSearchParams();
    params.set("dates", dates.join(","));

    if (names && names.length > 0) {
        names.forEach(name => params.append("name", name));
    }

    const response = await fetch(`/api/availability?${params.toString()}`);

    if (!response.ok) {
        throw new Error("Failed to fetch availability")
    };
    return response.json();
};