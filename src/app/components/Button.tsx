interface IButtonProps {
    text: string;
    onClick?: () => void;
    background?: string;
    absolute?: boolean;
    disabled?: boolean;
}

export default function Button({ text, onClick, background, absolute, disabled }: IButtonProps) {
    return (
        <button className={`w-full ${background ? background : "bg-[#1D1D1D]"}  ease-in-out text-sm duration-200 color-white text-gray-200 mb-6 p-2 rounded-xl h-[40px] ${absolute ? "absolute bottom-0" : ""} ${disabled ? "bg-gray-400" : "bg-[#1D1D1D] hover:bg-gray-800"}`} onClick={onClick} disabled={disabled}> {text}</button >
    )
}