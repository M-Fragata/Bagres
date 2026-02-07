

type Props = React.ComponentProps<"button"> & {
    isActive?: boolean;
    title: string;
}

export function HourButton({ title, isActive, type = "button", ...rest }: Props) {


    return (
        <button {...rest} type={type}
            className={`border border-white rounded-2xl px-2 py-1 cursor-pointer hover:opacity-70 transition-opacity duration-200
                ${isActive
                    ? "bg-bagre-primaria border text-white"
                    : "border-white hover:bg-white/50"
                }`}
        >
            {title}
        </button>
    )
}