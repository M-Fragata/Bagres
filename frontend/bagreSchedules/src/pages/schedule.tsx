import { useState, useEffect } from "react"

import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { SchedulePeriod } from "../components/SchedulePeriod"
import { ScheduleHours } from "../components/ScheduleHours"

import morning from "../assets/morning.png"
import afternoon from "../assets/afternoon.png"
import night from "../assets/night.png"
import trash from "../assets/trash.svg"
import logo from "../assets/logo.png"

export type ScheduleProps = {
    _id: string
    date: string
    hour: string
    name: string
}

const API_URL = "http://localhost:3333/schedules"

export function Schedule() {

    const [schedule, setSchedule] = useState<ScheduleProps[]>([])

    const [name, setName] = useState("")
    const [selectedHour, setSelectedHour] = useState<string | null>(null)
    const [date, setDate] = useState(new Date().toISOString().split("T")[0])

    async function handleSubmit(event: React.FormEvent) {

        event.preventDefault()

        if (!selectedHour) {
            alert("Por favor, selecione um horário para o treino.")
            return
        }

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    date: date,
                    hour: selectedHour,
                    name: name
                })
            })

            if (!response.ok) {
                throw new Error("Erro ao salvar agendamento")
            }

            const data = await response.json()
            setSelectedHour(null)
            setName("")
            getSchedules()

            console.log("Sucesso: ", data)
            alert("Agendado com sucesso")
        } catch (error) {
            console.error(error)
            alert("Falha ao conectar com servidor")
        }

        alert(`Treino agendado para ${date} às ${selectedHour} para o atleta ${name}.`)
    }

    async function getSchedules() {
        try {
            const response = await fetch(`${API_URL}?date=${date}`, {
                method: "GET",
                headers: { "Content-type": "application/json" }
            })

            if (response.ok) {
                const data: ScheduleProps[] = await response.json()

                setSchedule(data)
                console.log(schedule)
            }
        } catch (error) {
            console.error("Erro ao buscar agendamentos: ", error)
        }
    }

    useEffect(() => {
        getSchedules()
    }, [date])

    return (
        <main className="bg-blue-950 min-h-screen w-full flex flex-col items-center justify-center p-3 min-[1100px]:flex-row gap-10">
            <form onSubmit={handleSubmit}
                className="border-white shadow-[0px_0px_10px_rgba(255,255,255,0.5)] rounded-2xl p-6 text-white flex flex-col gap-3 "
            >
                <div>
                    <h1>Agende seu treinamento</h1>
                    <div>
                        <h2>Atenção!</h2>
                        <p>Agendamento para treinos apenas nas Segundas e Quartas-feiras</p>
                        <p>Informe a data, horário e o nome do atleta para criar o agendamento.</p>
                    </div>
                </div>

                <Input
                    legend="Informe a data:"
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                />

                <h2>Horários</h2>
                <div className="flex gap-2">
                    <div className="flex flex-col gap-1">
                        < ScheduleHours
                            title="Manhã"
                            initial={800}
                            final={1100}
                            onSelect={setSelectedHour}
                            selected={selectedHour}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        < ScheduleHours
                            title="Tarde"
                            initial={1400}
                            final={1700}
                            onSelect={setSelectedHour}
                            selected={selectedHour}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        < ScheduleHours
                            title="Noite"
                            initial={1745}
                            final={2000}
                            onSelect={setSelectedHour}
                            selected={selectedHour}
                        />
                    </div>
                </div>

                <Input
                    required
                    legend="Atleta"
                    placeholder="Nome do atleta"
                    onChange={(event) => setName(event.target.value)}
                />
                <Button
                    title="Agendar Treino"
                />
            </form>
            <section>
                <aside className="flex items-center gap-4 mb-4">
                    <div>
                        <img className="w-20 h-20"
                            src={logo}
                            alt="icone dos bagres" />
                    </div>
                    <div className="text-white">
                        <h2>Agendamentos</h2>
                        <p>Vizualize os agendamentos de acordo com a data selecionada</p>
                    </div>
                </aside>
                <aside className="flex flex-col gap-2 mt-4 w-full min-[1100px]:mt-0">
                    < SchedulePeriod
                        icon={morning}
                        title="Manhã"
                        period="08 - 11h"
                        selectedDate={date}
                        schedules={schedule}
                        cancelIcon={trash}
                    />
                    < SchedulePeriod
                        icon={afternoon}
                        title="Tarde"
                        period="14 - 17h"
                        selectedDate={date}
                        schedules={schedule}
                        cancelIcon={trash}
                    />
                    < SchedulePeriod
                        icon={night}
                        title="Noite"
                        period="18 - 20h"
                        selectedDate={date}
                        schedules={schedule}
                        cancelIcon={trash}
                    />
                </aside>
            </section>
        </main>
    )
}
