"use client";

import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { AvailabilityResult, Slot } from "../types/Availability";
import { formatDate } from "@lib/client/formatDate";
import { formatRange } from "@lib/client/formatRange";


interface IBookingGridProps {
    dates: Date[];
    availability: AvailabilityResult;
    loading: boolean;
    selectedSlot: Slot | null
    setOffset: React.Dispatch<React.SetStateAction<number>>;
    setSelectedSlot: React.Dispatch<React.SetStateAction<Slot | null>>
}

export default function BookingGrid({
    dates,
    availability,
    loading,
    selectedSlot,
    setOffset,
    setSelectedSlot,
}: IBookingGridProps) {

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <ArrowCircleLeftOutlinedIcon
                    sx={{ fontSize: "24px" }}
                    className="cursor-pointer text-gray-700 hover:text-black"
                    onClick={() => setOffset(prev => prev - 3)}
                />
                <h2 className="text-base tracking-normal">{formatRange(dates)}</h2>
                <ArrowCircleRightOutlinedIcon
                    sx={{ fontSize: "24px" }}
                    className="cursor-pointer text-gray-700 hover:text-black"
                    onClick={() => setOffset(prev => prev + 3)}
                />
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-3 border rounded-md border-[#BDBDBD] max-h-[290px] overflow-y-scroll scrollbar-hide">
                    {dates.map((date, idx) => {
                        const dateKey = date.toISOString().split("T")[0];
                        const dayRooms = availability[dateKey] || [];

                        return (
                            <div
                                key={dateKey}
                                className={`bg-[#ececec] ${idx !== 0 ? "border-l border-[#BDBDBD]" : ""}`}
                            >
                                <h3 className="text-center font-medium border-b tracking-normal border-[#BDBDBD] p-2">{formatDate(date)}</h3>
                                <div className="flex flex-col gap-2 p-1">
                                    {dayRooms.length > 0 && (
                                        dayRooms.map((room) =>
                                            room.slots.map((slot) => {
                                                const isSelected =
                                                    selectedSlot &&
                                                    selectedSlot.date === dateKey &&
                                                    selectedSlot.roomId === room.roomId &&
                                                    selectedSlot.hour === slot.hour;

                                                return (
                                                    <button
                                                        key={`${room.roomId}-${slot.hour}`}
                                                        onClick={() =>
                                                            setSelectedSlot({
                                                                date: dateKey,
                                                                roomId: room.roomId,
                                                                hour: slot.hour,
                                                            })
                                                        }
                                                        className={`border rounded-md p-2 text-sm text-start text-[#1C1B1F] border-[#00695C] transition-colors ${isSelected ? "bg-[#00695C] border-green-600 text-white" : "hover:bg-green-100"
                                                            }`}
                                                    >
                                                        {room.roomName} ({room.capacity}) <br />
                                                        {slot.label}
                                                    </button>
                                                );
                                            })
                                        )
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

        </div>
    );
}
