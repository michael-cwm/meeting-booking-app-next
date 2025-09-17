
"use client";

import { useState } from "react";
import Button from "./Button";
import CheckboxList from "./CheckboxList";

interface Option {
    value: string;
    label: string;
}

interface IDropDownSelectProps {
    value: string[];
    onChange: (value: string[]) => void;
    options: Option[]
};

export default function DropDownSelect({ value, onChange, options }: IDropDownSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("Mötesrum");
    const [localSelection, setLocalSelection] = useState<string[]>(value);


    const handleApply = () => {
        onChange(localSelection);
        setIsOpen(false);
        setSelectedValue(localSelection.length ? `${localSelection.length} valda rum` : "Mötesrum");
    };

    const handleClear = () => {
        setLocalSelection([]);
        onChange([]);
        setSelectedValue("Mötesrum");
        setIsOpen(false)

    };

    return (
        <div className="relative my-[40px]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-[45%] bg-[#ececec] border border-[#BDBDBD] rounded-md p-2 text-left flex items-center justify-between w-[130px]"
            >
                <span className="text-[#212121] text-sm">{selectedValue}</span>
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="shadow-div absolute w-full px-4 top-full left-0 mt-1 bg-[#ececec] border border-[#bdbdbd] rounded-md z-50 overflow-hidden">

                    <CheckboxList
                        options={options}
                        localSelection={localSelection}
                        setLocalSelection={setLocalSelection}
                    />
                    <div className="flex gap-2">
                        <Button text={"Välj"} onClick={handleApply} />
                        <Button text={"Avmarkera"} background={"bg-gray-700"} onClick={handleClear} />
                    </div>
                </div>
            )}
        </div>
    );
}