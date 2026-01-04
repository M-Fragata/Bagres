type Props = React.ComponentProps<"input"> & {
    legend: string
    className?: string
}

export function Input({legend, type = "text", className, ...rest }: Props) {
    return (
        <fieldset>
            <legend className={`text-white ${className}`}>{legend}</legend>
            <input {...rest}
                type={type}
                className="border border-gray-300 rounded-2xl px-4 py-2 outline-none w-full text-white focus:border-blue-900 focus-within:bg-black/50"
            />
        </fieldset>

    )
}