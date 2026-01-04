type Props = React.ComponentProps<"input"> & {
    legend: string
}

export function Input({legend, type = "text", ...rest }: Props) {
    return (
        <fieldset>
            <legend>{legend}</legend>
            <input {...rest}
                type={type}
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </fieldset>

    )
}