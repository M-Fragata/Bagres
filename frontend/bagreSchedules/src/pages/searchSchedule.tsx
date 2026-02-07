import { useState, useEffect } from "react"
import { Input } from "../components/Input"
import { RoutesURL } from "../utils/routesURL"
import { ScheduleHourSearch } from "../components/scheduleHourSearch"

import cancel from "../assets/trash.svg"

const token = localStorage.getItem("@bagres:token");
const user = JSON.parse(localStorage.getItem("@bagres:user") || "{}")

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

            console.log(user.role)

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

    useEffect(() => {
        async function verifyRole() {
            if (user.role === "admin") {
                return
            } else if (user.role === "user") {
                const nameFormated = user.name.toUpperCase()
                setName(nameFormated)
            }
        }
        verifyRole()

    }, [])

    return (
        <main className="bg-bagre-terciaria w-full flex flex-col items-center justify-center p-3 gap-10">
            <div className="flex w-full max-w-200 p-2 border border-bagre-terciaria rounded-lg shadow-2xl">
                <div className="flex w-full ">
                    <div className="flex-2">
                        <Input
                            inputClassName="text-black text-[11px] mobile:text-sm"
                            value={name}
                            placeholder="Buscar"
                            onChange={(event) => setName(event.target.value)}
                            disabled={user.role !== "admin"}
                        />
                    </div>
                    <div className="flex-1 mx-2">
                        <Input
                            inputClassName="text-[11px] mobile:text-sm"
                            type="date"
                            onChange={(event) => setDate(event.target.value)} />
                    </div>
                </div>
            </div>

            <div className="w-full max-w-200 h-full max-h-[80dvh] p-4 overflow-y-auto bg-bagre-primaria rounded-lg">
                <ScheduleHourSearch
                    schedules={schedules} cancelIcon={cancel} onDelete={handleDeleteSchedule} />
            </div>
        </main>
    )
}