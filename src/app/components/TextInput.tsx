interface ITextInputProps {
    placeholder: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TextInput({ placeholder, onChange }: ITextInputProps) {
    return <>
        <input onChange={(e) => onChange(e)} type="text" placeholder={placeholder} className="placeholder-[#868686] my-2 w-full p-4 h-[45px] bg-[#ececec] border border-[#BDBDBD] rounded-md" />
    </>
}