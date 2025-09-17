interface IOption {
    value: string;
    label: string;
}

interface ICheckboxListProps {
    options: IOption[];
    localSelection: string[];
    setLocalSelection: (values: string[]) => void;
}

export default function CheckboxList({ options, localSelection, setLocalSelection }: ICheckboxListProps) {
    const handleCheckboxChange = (value: string) => {
        if (localSelection.includes(value)) {
            setLocalSelection(localSelection.filter(v => v !== value));
        } else {
            setLocalSelection([...localSelection, value]);
        }
    };

    return (
        <ul className="w-full py-6 text-sm text-gray-800">
            {options.map(option => (
                <li key={option.value} className="flex justify-between items-center m-1 py-1">
                    <label htmlFor={option.value}>{option.label}</label>
                    <input
                        id={option.value}
                        type="checkbox"
                        value={option.value}
                        checked={localSelection.includes(option.value)}
                        onChange={() => handleCheckboxChange(option.value)}
                        className="w-[20px] h-[20px] bg-[#ececec] border border-[#BDBDBD] rounded-sm text-[#00695C]"
                    />
                </li>
            ))}
        </ul>
    );
}
