type Props = React.ComponentProps<"button"> & {
    icon?: string;
}

export function ButtonIcon({ icon, ...rest }: Props) {
    return (
        <button {...rest} 
            className="bg-bagre-terciaria rounded cursor-pointer hover:opacity-70 transition-opacity duration-200 p-2"
        >
            {icon && <img src={icon} alt="Icon" className="w-5" />}
        </button>
    )
}