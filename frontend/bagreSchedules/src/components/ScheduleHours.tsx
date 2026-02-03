
import { HourButton } from "../components/HourButton"
import { Hours } from "../utils/openingHours"

type ScheduleHoursProps = {
    title: string,
    initial: number
    final: number,
    selected?: string | null,
    onSelect?: (hour: string) => void
}

export function ScheduleHours({ title, initial, final, selected, onSelect }: ScheduleHoursProps) {

    return (
        <div className="flex gap-2">
            <div className="flex flex-col gap-1">
                <p className="text-center">{title}</p>
                {Hours.map((hour) => {
                    const hourNumber = Number(hour.replace(":", ""))
                    //08:00 -> 0800
                    if (initial <= hourNumber && hourNumber <= final) {
                        return <HourButton
                            key={hour}
                            title={hour}
                            value={hour}
                            isActive={selected === hour}
                            onClick={() => onSelect?.(hour)}
                        />
                    }
                })}
            </div>
        </div>
    )
}