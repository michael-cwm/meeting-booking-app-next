"use client"

import Button from "./components/Button";
import { useRouter } from "next/navigation";

export default function Booking() {
  const router = useRouter();

  const navigate = () => {
    router.push("/booking");
  }
  return (
    <div className="flex flex-col justify-between h-full">
      <h1 className="mt-16">Boka ett rum</h1>
      <Button onClick={navigate} text={"Boka"} absolute />
    </div>
  )
}