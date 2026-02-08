import { useState, useEffect } from "react"

import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { SchedulePeriod } from "../components/SchedulePeriod"
import { ScheduleHours } from "../components/ScheduleHours"
import { RoutesURL, token } from "../utils/routesURL"

import morning from "../assets/morning.png"
import afternoon from "../assets/afternoon.png"
import night from "../assets/night.png"
import logo from "../assets/logo.png"
import priscila from "../assets/priscila.jpeg"

export type ScheduleProps = {
    id: string
    date: string
    hour: string
    atleta: string
}

export function Schedule() {

    const [schedule, setSchedule] = useState<ScheduleProps[]>([])

    const [name, setName] = useState("")
    const [selectedHour, setSelectedHour] = useState<string | null>(null)
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]) // Formato YYYY-MM-DD


    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        const now = new Date()

        if (!selectedHour) {
            alert("Por favor, selecione um horário para o treino.");
            return;
        }

        const [year, month, day] = date.split("-").map(Number)
        const [hour, minute] = selectedHour.split(":").map(Number)

        const scheduleDateTime = new Date(year, month - 1, day, hour, minute)

        if (scheduleDateTime < now) {
            alert("Não é possível agendar em uma data ou horário que já passou.");
            return;
        }

        try {
            const response = await fetch(RoutesURL.API_SCHEDULES, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: name,
                    date: date,
                    hour: selectedHour
                })
            })

            const result = await response.json()

            if(response.status === 400) {
                alert(result.error || "Erro ao processar agendamento")
                return
            }

            if (!response.ok) {
                throw new Error("Erro ao salvar agendamento")
            }

            setSelectedHour(null)
            getSchedules()

            alert("Agendado com sucesso")
        } catch (error) {
            console.log(error)
            alert("Falha ao conectar com servidor")
        }

    }

    async function getSchedules() {

        try {
            const response = await fetch(`${RoutesURL.API_SCHEDULES}?date=${date}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data: ScheduleProps[] = await response.json()

                setSchedule(data)
            }
        } catch (error) {
            console.error("Erro ao buscar agendamentos: ", error)
        }
    }

    async function getNameLogged() {

        try {
            const response = await fetch(`${RoutesURL.API_LOGIN}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                const { firstName, lastName } = data
                setName(`${firstName.toUpperCase()} ${lastName.toUpperCase()}`)

                localStorage.setItem("@bagres:userName", `${firstName}`)

            }
        } catch (error) {

            console.error("Erro ao buscar nome do usuário logado: ", error)

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
                getSchedules()
            }
            else {
                throw new Error("Erro ao deletar agendamento")
            }

        } catch (error) {
            console.error("Erro ao deletar agendamento: ", error)
        }
    }

    // Busca o nome apenas UMA vez quando a tela carrega
    useEffect(() => {
        getNameLogged()
    }, [])

    // Busca agendamentos sempre que a data mudar
    useEffect(() => {
        getSchedules()
    }, [date])

    return (
        <main className="bg-bagre-terciaria w-full min-h-full flex flex-col items-center p-3 gap-10 min-[1100px]:flex-row min-[1100px]:justify-center">
            <form onSubmit={handleSubmit}
                style={{ backgroundImage: `url(${priscila})` }}
                className="border-white shadow-[0px_0px_10px_rgba(255,255,255,0.5)] rounded-2xl p-12 text-white flex flex-col gap-3 bg-cover bg-center mobile:bg-left min-[1100px]:h-[730px]"
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
                    disabled
                    required
                    value={name}
                    legend="Atleta"
                    placeholder="Nome do atleta"
                    onChange={(event) => setName(event.target.value)}
                />
                <Button
                    title="Agendar Treino"
                />
            </form>
            <section className="bg-bagre-primaria rounded-2xl p-12 min-[1100px]:h-[730px] flex flex-col h-full">
                <aside className="flex items-center gap-4 mb-4 ">
                    <div>
                        <img className="w-10 h-12"
                            src={logo}
                            alt="icone dos bagres" />
                    </div>
                    <div className="text-white">
                        <h2 className="text-bagre-secundaria">Agendamentos</h2>
                        <p>Vizualize os agendamentos de acordo com a data selecionada</p>
                    </div>
                </aside>
                <aside className="flex flex-1 flex-col gap-2 mt-4 w-full min-[1100px]:mt-0">
                    < SchedulePeriod
                        icon={morning}
                        title="Manhã"
                        period="08 - 11h"
                        selectedDate={date}
                        schedules={schedule}
                        onDelete={handleDeleteSchedule}
                    />
                    < SchedulePeriod
                        icon={afternoon}
                        title="Tarde"
                        period="14 - 17h"
                        selectedDate={date}
                        schedules={schedule}
                        onDelete={handleDeleteSchedule}
                    />
                    < SchedulePeriod
                        icon={night}
                        title="Noite"
                        period="18 - 20h"
                        selectedDate={date}
                        schedules={schedule}
                        onDelete={handleDeleteSchedule}
                    />
                </aside>
            </section>
        </main>
    )
}
