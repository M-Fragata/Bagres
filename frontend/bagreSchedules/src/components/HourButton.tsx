import { useState } from "react"

type Props = React.ComponentProps<"button"> & {
    isActive?: boolean;
    title: string;
}

export function HourButton({ title, isActive, type = "button", ...rest }: Props) {


    return (
        <button {...rest} type={type}
            className={`border border-white rounded-2xl px-2 py-1 cursor-pointer hover:opacity-70 transition-opacity duration-200
                ${isActive
                    ? "bg-blue-400 border-blue-400 text-white shadow-[0_0_10px_#60a5fa]"
                    : "border-white hover:bg-white/10"
                }`}
        >
            {title}
        </button>
    )
}