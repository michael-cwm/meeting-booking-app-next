"use client"

import Button from "app/components/Button";
import PageTitle from "app/components/PageTitle";
import TextInput from "app/components/TextInput";
import { createBooking } from "@lib/api/createBooking";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useModal } from "app/context/ModalContext";

export default function Confirm() {
    const [textInput, setTextInput] = useState<string>("")
    const { openModal } = useModal()

    const searchParams = useSearchParams();

    const roomId = searchParams.get("roomId");
    const date = searchParams.get("date");
    const hour = searchParams.get("hour");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(e.target.value)
    }

    const handleSubmit = async () => {
        if (!roomId || !date || !hour) {
            throw new Error("Missing booking data in url")
        }

        try {
            await createBooking({
                roomId: Number(roomId),
                date,
                hour: Number(hour),
                name: textInput,
            });

            openModal()
        } catch (error) {
            console.error("error:", error)
        }
    }



    return (
        <>
            <div className="relative h-full flex flex-col p-[-24]">
                <PageTitle text={"Vem bokar?"} />
                <p className="font-medium text-[#212121] text-xl">Förnamn och efternamn</p>
                <TextInput onChange={handleChange} placeholder={"Skriv ditt fullständiga namn här"} />
                <Button text={"Boka"} onClick={handleSubmit} absolute />
            </div>
        </>
    )
}