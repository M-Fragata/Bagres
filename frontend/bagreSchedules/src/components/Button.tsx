type Props = React.ComponentProps<"button"> &{
    icon?: string;
    title?: string;
}

export function Button({title, icon, type = "submit", ...rest }: Props) {
    return (
        <button {...rest} type={type}
            className="bg-blue-900 text-white px-4 py-2 mt-4 mb-2 rounded-2xl cursor-pointer hover:opacity-90 transition-opacity duration-200 "
        >
            {icon && <img src={icon} alt="Icon" className="mr-2 inline-block w-7 p-0 m-0" />}
            {title}
        </button>
    )
}