import { useState, useEffect } from "react"
import { Input } from "../components/Input"
import { RoutesURL } from "../utils/routesURL"
import { ScheduleHourSearch } from "../components/scheduleHourSearch"
import { ScheduleHours } from "../components/ScheduleHours"

import cancel from "../assets/trash.png"
import edit from "../assets/edit.png"

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
    const [hour, setHour] = useState("")

    useEffect(() => {
        if (user.role === "user") {
            setName(user.name)
        }
    }, [])

    async function handleGetSchedules() {

        const searchName = user.role === "admin" ? name : user.name

        try {
            const response = await fetch(`${RoutesURL.API_SCHEDULES}?date=${date}&name=${searchName}`, {
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

    async function handleDeleteSchedule(schedule: ScheduleProps) {
        try {



            setDate(schedule.date)
            setHour(schedule.hour)

            const now = new Date()
            const agendamento = new Date(`${date}T${hour}`)

            if (agendamento < now) {
                const isConfirm = confirm("Excluir agendamento passado?")
                if (!isConfirm) {
                    return
                }
            } else {
                const confirmed = window.confirm("Tem certeza que deseja deletar este agendamento?")
                if (!confirmed) {
                    return
                }
            }


            const response = await fetch(`${RoutesURL.API_SCHEDULES}/${schedule.id}`, {
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


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSchedule, setCurrentSchedule] = useState<ScheduleProps | null>(null);

    // Campos do formulário dentro do modal
    const [editName, setEditName] = useState("");
    const [editDate, setEditDate] = useState("");
    const [editHour, setEditHour] = useState("");

    function openEditModal(schedule: ScheduleProps) {
        setCurrentSchedule(schedule);
        setEditName(schedule.atleta);
        setEditDate(schedule.date);
        setDate(schedule.date);
        setEditHour(schedule.hour);
        setHour(schedule.hour)


            const now = new Date()
            const agendamento = new Date(`${date}T${hour}`)

            if (agendamento < now) {
                const isConfirm = confirm("Editar agendamento passado?")
                if (!isConfirm) {
                    return
                }
            } else {
                const confirmed = window.confirm("Tem certeza que deseja editar este agendamento?")
                if (!confirmed) {
                    return
                }
            }

        setIsModalOpen(true);
    }

    async function handleEditSchedule() {
        if (!currentSchedule) return;

        const now = new Date();
        const [y, m, d] = editDate.split("-").map(Number);
        const [h, min] = editHour.split(":").map(Number);

        // Usamos o '!' para garantir ao TS que os valores existem após o split
        const scheduleDateTime = new Date(y!, m! - 1, d!, h!, min!);

        if (scheduleDateTime < now) {
            alert("Não é possível alterar para um horário que já passou.");
            return;
        }

        try {
            const response = await fetch(`${RoutesURL.API_SCHEDULES}/${currentSchedule.id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: editName,
                    date: editDate,
                    hour: editHour
                })
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.error || "Erro ao atualizar");
                return;
            }

            alert("Atualizado com sucesso!");
            setIsModalOpen(false); // Fecha o modal
            handleGetSchedules();        // Atualiza a lista ao fundo
        } catch (error) {
            alert("Erro de conexão");
        }
    }

    useEffect(() => {
        handleGetSchedules()
    }, [date, name])


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
                    schedules={schedules}
                    cancelIcon={cancel}
                    onDelete={handleDeleteSchedule}
                    editIcon={edit}
                    data={openEditModal}
                />
            </div>


            { //Criando o modal
                isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-bagre-terciaria rounded-lg shadow-xl w-full max-w-md overflow-hidden">

                            {/* Header do Modal */}
                            <div className="bg-bagre-primaria p-4 flex justify-between items-center text-white">
                                <h2 className="font-bold text-lg">Editar Agendamento</h2>
                                <button onClick={() => setIsModalOpen(false)} className="hover:text-gray-200 cursor-pointer">
                                    ✕
                                </button>
                            </div>

                            {/* Corpo do Formulário */}
                            <div className="p-6 space-y-4">

                                <div className="flex flex-col gap-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Data</label>
                                        <input
                                            type="date"
                                            value={editDate}
                                            onChange={(e) => setEditDate(e.target.value)}
                                            className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                    <h2>Horários</h2>
                                    <div className="flex gap-2">
                                        <div className="flex flex-col gap-1">
                                            < ScheduleHours
                                                title="Manhã"
                                                initial={800}
                                                final={1100}
                                                onSelect={setEditHour}
                                                selected={editHour}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            < ScheduleHours
                                                title="Tarde"
                                                initial={1400}
                                                final={1700}
                                                onSelect={setEditHour}
                                                selected={editHour}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            < ScheduleHours
                                                title="Noite"
                                                initial={1745}
                                                final={2000}
                                                onSelect={setEditHour}
                                                selected={editHour}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Atleta</label>
                                        <input
                                            disabled
                                            type="text"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Rodapé com Ações */}
                            <div className="bg-gray-50 p-4 flex justify-end gap-3">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-md transition cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleEditSchedule}
                                    className="px-4 py-2 bg-bagre-primaria text-white hover:bg-bagre-primaria/90 rounded-md transition font-semibold cursor-pointer"
                                >
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </main>
    )
}