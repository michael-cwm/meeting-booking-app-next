import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import { useModal } from 'app/context/ModalContext';
import { useRouter } from 'next/navigation';


interface IModalProps {
    text: string;
    open: boolean;
}

export default function Modal({ text, open }: IModalProps) {
    const { closeModal } = useModal()
    const router = useRouter()

    const handleClick = () => {
        closeModal()
        router.push("/")
    }

    return (
        <>
            {open &&
                <div className="absolute inset-0  bg-black/35 flex justify-center items-center z-50" onClick={handleClick}>
                    <div className="w-[240px] h-[137px] bg-[#ececec] flex flex-col justify-center gap-2 items-center rounded-lg shadow-lg p-4">
                        {text}
                        <SentimentSatisfiedOutlinedIcon />
                    </div>
                </div>
            }
        </>
    )
}