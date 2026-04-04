import { useId } from "react"

type Props = React.ComponentProps<"input"> & {
    legend?: string
    legendClassName?: string
    inputClassName?: string
    logo?: string
    calendar?: string
}

export function Input({ legend, type = "text", legendClassName, inputClassName, logo, calendar, ...rest }: Props) {

    const inputID = useId()

    const handleIconClick = () => {
        const input = document.getElementById(inputID)
        if (input) {
            // @ts-ignore - Abre o seletor de data nativo
            input.showPicker();
        }
    };

    return (
        <fieldset>

            <div className="flex relative items-center">
                {logo && (
                    <label htmlFor={inputID} className={`border border-bagre-primaria rounded-l-xl p-2 align-bottom cursor-pointer bg-white hover:bg-bagre-primaria/50 ${legendClassName}`}>
                        <img src={logo} alt="Logo" className="text-white" />
                    </label>
                )}

                <input {...rest}
                    type={type}
                    id={inputID}
                    className={`border border-bagre-primaria px-4 py-2 outline-none w-full focus-within:bg-bagre-primaria/50 ${inputClassName} ${logo ? 'rounded-r-2xl' : 'rounded-2xl'}`}



                />
                {calendar && (
                    <img
                        src={calendar}
                        alt="ícone"
                        onClick={handleIconClick} // Abre o calendário ao clicar
                        className="absolute right-4 w-4 h-4 cursor-pointer"
                    />
                )}
            </div>
        </fieldset>

    )
}