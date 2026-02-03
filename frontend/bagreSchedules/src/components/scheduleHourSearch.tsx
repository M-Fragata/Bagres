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
            {schedules.map((schedule) => (
                <div
                    className="flex mb-4 p-4 border rounded justify-between items-center"
                    key={schedule.id}>
                    <div className="flex gap-5 items-center w-full">
                        <strong className="flex-2">{schedule.atleta}</strong>
                        <div className="flex flex-2 flex-col mobile:flex-row md:flex-1 gap-3">
                            <span className="mr-2">{schedule.date}</span>
                            <p>{schedule.hour} h</p>
                        </div>
                    </div>
                    <div>
                        <ButtonIcon icon={cancelIcon} onClick={() => onDelete(schedule.id)} />
                    </div>

                </div>
            ))}
        </div>
    )
}