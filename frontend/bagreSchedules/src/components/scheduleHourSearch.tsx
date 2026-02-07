import type { ScheduleProps } from "../pages/schedule.tsx"
import { ButtonIcon } from "./ButtonIcon.tsx"

type ScheduleSearchProps = {
    schedules: ScheduleProps[],
    cancelIcon: string,
    onDelete: (id: string) => void
}


export function ScheduleHourSearch({ schedules, cancelIcon, onDelete }: ScheduleSearchProps) {
    return (
        <div>
            {schedules.map((schedule) => {

                const formattedDate = new Date(schedule.date.replaceAll("-", "/")).toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit"
                })

                return (
                
                <div
                    className="flex mb-2 p-1 border rounded justify-between items-center mobile:p-4 bg-bagre-terciaria"
                    key={schedule.id}>
                    <div className="flex gap-1 items-center w-full text-[12px] mobile:text-base">
                        <strong className="flex-2 text-bagre-secundaria">{schedule.atleta}</strong>
                        <div className="flex flex-2 flex-row gap-3">
                            <span className="mr-2">{formattedDate}</span>
                            <p>{schedule.hour} h</p>
                        </div>
                    </div>
                    <div>
                        <ButtonIcon icon={cancelIcon} onClick={() => onDelete(schedule.id)} />
                    </div>

                </div>
            )})}
        </div>
    )
}