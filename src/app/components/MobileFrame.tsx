"use client";

import React from "react";
import Modal from "./Modal";
import { useModal } from "app/context/ModalContext";

const Mobile = ({ children }: { children: React.ReactNode }) => {
    const { isOpen, closeModal } = useModal();
    return (
        <div className="relative w-[393px] h-[700px] mx-auto">
            {/* Phone Frame */}
            <div className="absolute inset-0 rounded-[50px] border-4 border-gray-300 shadow-xl bg-black"></div>

            {/* Camera Container */}
            <div className="absolute top-[25] z-10 left-1/2 transform -translate-x-1/2 w-24 h-7 bg-black rounded-3xl flex justify-center items-center space-x-2">
                <div className="absolute right-[12] w-3 h-3 bg-gray-800 rounded-full"></div> {/* Camera */}

            </div>

            {/* Screen  */}
            <div className="absolute top-4 bottom-4 left-4 right-4 bg-[#ececec] rounded-[40px] overflow-hidden p-4">
                <Modal text={"Ditt rum är bokat!"} open={isOpen} />
                {/* Content */}
                <div className="h-full w-full relative overflow-hidden ">
                    {children}

                </div>
            </div>

            {/* Volume Buttons */}
            <div className="absolute left-[-7] top-36 flex flex-col space-y-3 pl-1">
                <div className="w-1 h-10 bg-gray-300 rounded"></div>
                <div className="w-1 h-10 bg-gray-300 rounded"></div>
            </div>

            {/* Power Button  */}
            <div className="absolute right-[-3] top-40 w-1 h-16 bg-gray-300 rounded pr-1"></div>

        </div>
    );
};

export default Mobile;
