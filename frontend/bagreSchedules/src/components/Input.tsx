import { useId } from "react"

type Props = React.ComponentProps<"input"> & {
    legend?: string
    legendClassName?: string
    inputClassName?: string
    logo?: string
}

export function Input({ legend, type = "text", legendClassName, inputClassName, logo, ...rest }: Props) {

    const inputID = useId()

    return (
        <fieldset>

            <div className="flex">
                {logo && (
                    <label htmlFor={inputID} className={`border border-bagre-primaria rounded-l-xl p-2 align-bottom cursor-pointer bg-white hover:bg-bagre-primaria/50 ${legendClassName}`}>
                        <img src={logo} alt="Logo" className="text-white"/>
                    </label>
                )}

                <input {...rest}
                    type={type}
                    id={inputID}
                    className={`border border-bagre-primaria px-4 py-2 outline-none w-full focus-within:bg-bagre-primaria/50 ${inputClassName} ${logo ? 'rounded-r-2xl' : 'rounded-2xl'}`}
                />
            </div>
        </fieldset>

    )
}