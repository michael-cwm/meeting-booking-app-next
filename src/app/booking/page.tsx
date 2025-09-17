
"use client";

import { useEffect, useState } from "react";
import DropDownSelect from "../components/DropDownSelect";
import BookingGrid from "../components/BookingGrid";
import { fetchRooms } from "@lib/api/fetchRooms";
import { getDates } from "@lib/client/getDates";
import { Room } from "app/types/Room";
import PageTitle from "app/components/PageTitle";
import { Slot } from "../types/Availability"
import Button from "app/components/Button";
import { useRouter } from "next/navigation";
import { fetchAvailability } from "@lib/api/fetchAvailability";


export default function Time() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [selectedRooms, setSelectedRooms] = useState<string[]>([])
    const [offset, setOffset] = useState(0);
    const [availability, setAvailability] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

    const router = useRouter()

    const handleNext = () => {
        if (!selectedSlot) return

        const params = new URLSearchParams({
            roomId: selectedSlot.roomId.toString(),
            date: selectedSlot.date,
            hour: selectedSlot.hour.toString()
        })

        router.push(`confirm?${params.toString()}`)
    }

    const dates = getDates(offset);
    const dateKeys = dates.map(d => d.toISOString().split("T")[0]);


    const getAvailableRooms = async () => {
        setLoading(true);
        try {
            const data = await fetchAvailability(dateKeys, selectedRooms);
            setAvailability(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchRooms().then(setRooms).catch(console.error)
    }, [])

    useEffect(() => {
        getAvailableRooms()
    }, [offset, selectedRooms]);

    return (
        <>
            <PageTitle text={"Välj en tid"} />
            <DropDownSelect
                options={rooms.map(r => ({ value: r.name, label: `${r.name} (${r.capacity} personer)` }))}
                onChange={setSelectedRooms}
                value={selectedRooms} />
            <BookingGrid
                dates={dates}
                availability={availability}
                loading={loading}
                setOffset={setOffset}
                setSelectedSlot={setSelectedSlot}
                selectedSlot={selectedSlot} />
            <Button text={"Nästa"} absolute disabled={!selectedSlot} onClick={handleNext} />
        </>
    )
}