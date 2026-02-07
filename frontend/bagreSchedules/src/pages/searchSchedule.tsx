import { useState, useEffect } from "react"
import { Input } from "../components/Input"
import { RoutesURL } from "../utils/routesURL"
import { ScheduleHourSearch } from "../components/scheduleHourSearch"

import cancel from "../assets/trash.svg"

const token = localStorage.getItem("@bagres:token");

export type ScheduleProps = {
    id: string
    date: string
    hour: string
    atleta: string
}

export function SearchSchedule() {

    const [date, setDate] = useState("")
    const [name, setName] = useState("")
    const [schedules, setSchedules] = useState<ScheduleProps[]>([])


    async function handleGetSchedules() {
        try {
            const response = await fetch(`${RoutesURL.API_SCHEDULES}?date=${date}&name=${name}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            })

            if (!response.ok) {
                throw new Error("Erro ao buscar agendamentos")
            }

            const data = await response.json()
            setSchedules(data)

        } catch (error) {
            console.error("Erro ao buscar agendamentos:", error)
        }
    }

    async function handleDeleteSchedule(id: string) {
        try {

            const confirmed = window.confirm("Tem certeza que deseja deletar este agendamento?")

            if (!confirmed) {
                return
            }

            const response = await fetch(`${RoutesURL.API_SCHEDULES}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            })

            if (response.ok) {
                handleGetSchedules()
            }
            else {
                throw new Error("Erro ao deletar agendamento")
            }

        } catch (error) {
            console.error("Erro ao deletar agendamento: ", error)
        }
    }

    useEffect(() => {
        handleGetSchedules()
    }, [date, name])

    return (
        <main className="bg-bagre-terciaria w-full h-full flex flex-col items-center justify-center p-3 gap-10">
            <div className="flex w-full max-w-200 p-4 border border-bagre-terciaria rounded-2xl shadow-2xl">
                <div className="flex flex-col-reverse md:flex-row w-full ">
                    <div className="flex-2">
                        <Input
                            inputClassName="text-black"
                            placeholder="Buscar"
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className="flex-1 mx-2">
                        <Input
                            type="date"
                            onChange={(event) => setDate(event.target.value)} />
                    </div>
                </div>
            </div>

            <div className="w-full max-w-200 h-[70dvh] p-4 overflow-y-auto bg-bagre-primaria rounded-lg">
                <ScheduleHourSearch 
                schedules={schedules} cancelIcon={cancel} onDelete={handleDeleteSchedule} />
            </div>
        </main>
    )
}