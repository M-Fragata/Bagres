import type { ScheduleProps } from "../pages/schedule.tsx"
import { ButtonIcon } from "./ButtonIcon.tsx"

type ScheduleSearchProps = {
    schedules: ScheduleProps[],
    cancelIcon: string,
    onDelete: (schedules: ScheduleProps) => void,
    editIcon: string,
    data: (schedules: ScheduleProps) => void
}


export function ScheduleHourSearch({ schedules, cancelIcon, onDelete, editIcon, data }: ScheduleSearchProps) {



    return (
        <div>
            {schedules.map((schedule) => {

                const agora = new Date()
                const dataAgendamento = new Date(`${schedule.date}T${schedule.hour}`)
                const isPassado = dataAgendamento < agora

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
                        <div className="flex">
                            <ButtonIcon
                                isDisabled={isPassado}
                                icon={editIcon}
                                onClick={() => {
                                    data(schedule)
                                }}
                            />
                            <ButtonIcon 
                            isDisabled={isPassado}
                            icon={cancelIcon} 
                            onClick={() => onDelete(schedule)} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}