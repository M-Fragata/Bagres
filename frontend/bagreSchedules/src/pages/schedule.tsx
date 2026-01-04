import { Input } from "../components/Input"
import { Button } from "../components/Button"

import morning from "../assets/morning.png"
import afternoon from "../assets/afternoon.png"
import night from "../assets/night.png"

export function Schedule() {
    return (
        <main className="bg-blue-950 min-h-screen w-full flex flex-col items-center justify-center p-2 min-[1100px]:flex-row md:gap-10">
            <form
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

                <Input legend="Informe a data:" type="date" />

                <h2>Horários</h2>
                <div className="flex gap-2">
                    <div className="flex flex-col gap-1">
                        <p className="text-center">Manhã</p>
                        <div className="border border-white rounded-2xl px-2 py-1">
                            08:00
                        </div>
                        <div className="border border-white rounded-2xl px-2 py-1">
                            09:00
                        </div>
                    </div>

                     <div className="flex flex-col gap-1">
                        <p className="text-center">Tarde</p>
                        <div className="border border-white rounded-2xl px-2 py-1">
                            08:00
                        </div>
                        <div className="border border-white rounded-2xl px-2 py-1">
                            09:00
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <p className="text-center">Noite</p>
                        <div className="border border-white rounded-2xl px-2 py-1">
                            08:00
                        </div>
                        <div className="border border-white rounded-2xl px-2 py-1">
                            09:00
                        </div>
                    </div>
                </div>

                <Input
                    legend="Atleta"
                    placeholder="Nome do atleta"
                />
                <Button
                    title="Agendar Treino"
                />
            </form>
            <section>
                <aside className="flex">
                    <div>
                        imagem
                    </div>
                    <div>
                        <h2>Agendamentos</h2>
                        <p>Vizualize os agendamentos de acordo com a data selecionada</p>
                    </div>
                </aside>
                <aside className="flex flex-col gap-2 text-white">
                    <div className="border border-white rounded-2xl p-2">
                        <div className="flex justify-between border border-transparent border-b-white mb-2 pb-2">
                            <div className="flex">
                                <img src={morning} alt="nascer do sol" />
                                <h3 className="ml-2">
                                    Manhã
                                </h3>
                            </div>
                            <p>08 - 11h</p>
                        </div>
                        <div className="flex justify-between pl-3 pr-3">
                            <div>
                                <p className="flex gap-2">
                                    <strong>
                                        08:00
                                    </strong>
                                    Fragata
                                </p>
                            </div>
                            <div>
                                X
                            </div>
                        </div>
                    </div>
                    <div className="border border-white rounded-2xl p-2">
                        <div className="flex justify-between border border-transparent border-b-white mb-2 pb-2">
                            <div className="flex">
                                <img src={afternoon} alt="pôr do sol" />
                                <h3 className="ml-2">
                                    Tarde
                                </h3>
                            </div>
                            <p>14 - 17h</p>
                        </div>
                        <div className="flex justify-between pl-3 pr-3">
                            <div>
                                <p className="flex gap-2">
                                    <strong>
                                        08:00
                                    </strong>
                                    Fragata
                                </p>
                            </div>
                            <div>
                                X
                            </div>
                        </div>
                    </div>
                    <div className="border border-white rounded-2xl p-2">
                        <div className="flex justify-between border border-transparent border-b-white mb-2 pb-2">
                            <div className="flex">
                                <img src={night} alt="Luar" />
                                <h3 className="ml-2">
                                    Noite
                                </h3>
                            </div>
                            <p>18 - 21h</p>
                        </div>
                        <div className="flex justify-between pl-3 pr-3">
                            <div>
                                <p className="flex gap-2">
                                    <strong>
                                        08:00
                                    </strong>
                                    Fragata
                                </p>
                            </div>
                            <div>
                                X
                            </div>
                        </div>
                    </div>
                </aside>
            </section>
        </main>
    )
}
