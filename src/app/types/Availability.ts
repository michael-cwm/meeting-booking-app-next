export type Slot = {
    date: string;
    roomId: number;
    hour: number;
    roomName?: string;
    capacity?: number;
    label?: string;
}

export type RoomAvailability = {
    roomId: number
    roomName: string
    capacity: number
    slots: Slot[]
}

export type AvailabilityResult = Record<string, RoomAvailability[]>