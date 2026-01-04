type Props = React.ComponentProps<"button">

export function Button({title, type = "submit", ...rest }: Props) {
    return (
        <button {...rest} type={type}
            className="bg-blue-900 text-white px-4 py-2 mt-4 mb-2 rounded-2xl cursor-pointer hover:opacity-90 transition-opacity duration-200"
        >
            {title}
        </button>
    )
}