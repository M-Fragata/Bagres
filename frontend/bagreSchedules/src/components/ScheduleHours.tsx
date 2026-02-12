import { useState, useEffect } from "react"
import { HourButton } from "../components/HourButton"
import { RoutesURL, token } from "../utils/routesURL"
import { type ScheduleProps } from "../pages/schedule"

type ScheduleHoursProps = {
    title: string,
    initial: number
    final: number,
    selected?: string | null,
    onSelect?: (hour: string) => void,
    schedules?: ScheduleProps[],
}

export function ScheduleHours({ title, initial, final, selected, onSelect }: ScheduleHoursProps) {

    const [hours, setHours] = useState<string[]>([])

    async function getHoursConfig() {
        try {

            const response = await fetch(RoutesURL.API_CONFIG, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            })

            if (!response.ok) {
                alert("Falha ao buscar configuração no banco de dados")
                return
            }

            const data = await response.json()

            setHours(data.horarios)

        } catch (error) {
            alert("Falha ao buscar configuração no banco de dados")
            return
        }

    }

    useEffect(() => {
        getHoursConfig()
    }, [])

    return (
        <div className="flex gap-2">
            <div className="flex flex-col gap-1">
                <p className="text-center">{title}</p>
                {hours && hours.map((hour) => {

                    const hourNumber = Number(hour.replace(":", ""))
                    //08:00 -> 0800
                    
                    if (initial <= hourNumber && hourNumber <= final) {
                        return (<HourButton
                            key={hour}
                            title={hour}
                            value={hour}
                            isActive={selected === hour}
                            onClick={() => onSelect?.(hour)}
                        />
                        )
                    }
                    return null
                }
                )}
            </div>
        </div>
    )
}