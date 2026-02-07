import type { ScheduleProps } from "../pages/schedule.tsx"


type SchedulePeriodProps = {
    icon: string,
    title: string,
    period: string,
    cancelIcon?: string,
    selectedDate: string,
    schedules: ScheduleProps[],
    onDelete?: (id: string) => void
}

export function SchedulePeriod({ icon, title, period, selectedDate, schedules }: SchedulePeriodProps) {
    return (
        <div className="border border-white rounded-2xl p-2 text-white min-h-20">
            <div className="flex justify-between border border-transparent border-b-white mb-2 pb-2">
                <div className="flex">
                    <img src={icon} alt={title} />
                    <h3 className="ml-2">
                        {title}
                    </h3>
                </div>
                <p className="text-xs mt-1">{period}</p>
            </div>

            {schedules.map((schedule) => {
                const hourNumber = Number(schedule.hour.replace(":", ""))

                if (schedule.date === selectedDate) {
                    if (period === "08 - 11h" && hourNumber >= 800 && hourNumber <= 1100) {
                        return (
                            <div key={schedule.id} className="flex justify-between pl-3 pr-3">
                                <div>
                                    <p className="flex gap-2">
                                        <strong>
                                            {schedule.hour}
                                        </strong>
                                        {schedule.atleta}
                                    </p>
                                </div>
                            </div>
                        )
                    } else if (period === "14 - 17h" && hourNumber >= 1400 && hourNumber <= 1700) {
                        return (
                            <div key={schedule.id} className="flex justify-between pl-3 pr-3">
                                <div>
                                    <p className="flex gap-2">
                                        <strong>
                                            {schedule.hour}
                                        </strong>
                                        {schedule.atleta}
                                    </p>
                                </div>
                            </div>
                        )
                    } else if (period === "18 - 20h" && hourNumber >= 1745 && hourNumber <= 2000) {
                        return (
                            <div key={schedule.id} className="flex justify-between pl-3 pr-3">
                                <div>
                                    <p className="flex gap-2">
                                        <strong>
                                            {schedule.hour}
                                        </strong>
                                        {schedule.atleta}
                                    </p>
                                </div>
                            </div>
                        )
                    }
                }

                return null
            })}

        </div>
    )
}