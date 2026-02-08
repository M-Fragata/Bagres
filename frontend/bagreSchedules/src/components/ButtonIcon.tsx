type Props = React.ComponentProps<"button"> & {
    icon?: string;
    isDisabled?: boolean;
}

export function ButtonIcon({ icon, isDisabled, ...rest }: Props) {

    const user = JSON.parse(localStorage.getItem("@bagres:user") || "{}")

    if (isDisabled && user.role !== "admin") {
        return <div className="p-2 w-9" />
    }

    return (
        <button {...rest}
            className={`bg-bagre-terciaria rounded cursor-pointer hover:opacity-70 transition-opacity duration-200 p-2`}
        >
            {icon && <img src={icon} alt="Icon" className="w-5" />}
        </button>
    )
}