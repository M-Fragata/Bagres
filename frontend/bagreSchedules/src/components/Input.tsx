type Props = React.ComponentProps<"input"> & {
    legend?: string
    legendClassName?: string
    inputClassName?: string
}

export function Input({legend, type = "text", legendClassName, inputClassName, ...rest }: Props) {
    return (
        <fieldset>
            <legend className={` ${legendClassName}`}>{legend}</legend>
            <input {...rest}
                type={type}
                className={`border border-gray-300 rounded-2xl px-4 py-2 outline-none w-full focus:border-bagre-primaria focus-within:bg-bagre-primaria/50 ${inputClassName}`}
            />
        </fieldset>

    )
}