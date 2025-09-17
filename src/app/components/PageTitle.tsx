interface IPageTitleProps {
    text: string
}

export default function PageTitle({ text }: IPageTitleProps) {
    return <h2 className="my-[40px] text-[40px]">{text}</h2>
}