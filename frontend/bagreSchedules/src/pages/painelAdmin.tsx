import { useState, useEffect } from "react"
import { RoutesURL, token } from "../utils/routesURL"

type AtletasProps = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    createdAt: string,
    role: string
}

export function PainelAdmin() {

    const [ativo, setAtivo] = useState("atletas")
    const [atletas, setAtletas] = useState<AtletasProps[]>()

    const [configAgendamento, setConfigAgendamento] = useState<Record<string, string[]>>({
        "Segunda": [],
        "Terça": [],
        "Quarta": [],
        "Quinta": [],
        "Sexta": [],
        "Sábado": [],
        "Domingo": []
    })


    const [diasAtivos, setDiasAtivos] = useState<Record<string, boolean>>({
        "Segunda": true,
        "Terça": false,
        "Quarta": true,
        "Quinta": false,
        "Sexta": false,
        "Sábado": false,
        "Domingo": false
    });


    async function handleGetAtletas() {
        try {
            const response = await fetch(RoutesURL.API_ATLETAS, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            })

            if (!response.ok) {
                alert("Erro ao buscar atletas")
                return
            }

            const data: AtletasProps[] = await response.json()

            setAtletas(data)

        } catch (error) {
            console.error("Erro ao buscar atletas: ", error)
        }
    }

    async function handlePutAtletas(atleta: AtletasProps, event: React.MouseEvent) {

        const row = (event.currentTarget as HTMLElement).closest('tr');

        // Captura os valores usando o atributo 'name' que você já colocou
        const updatedData = {
            firstName: (row?.querySelector('input[name="firstName"]') as HTMLInputElement).value,
            lastName: (row?.querySelector('input[name="lastName"]') as HTMLInputElement).value,
            email: (row?.querySelector('input[name="email"]') as HTMLInputElement).value,
            role: (row?.querySelector('select[name="role"]') as HTMLSelectElement).value
        };

        const confirmEdit = confirm(`Tem certeza que deseja editar o usuário: ${updatedData.firstName} ${updatedData.lastName}`)

        if (!confirmEdit) return

        try {
            const response = await fetch(`${RoutesURL.API_ATLETAS}/${atleta.id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            })

            if (!response.ok) {
                alert(`Não foi possível atualizar os dados do Atleta: ${updatedData.firstName} ${updatedData.lastName}`)
                handleGetAtletas()
                return
            }

            alert(`Atleta: ${updatedData.firstName} ${updatedData.lastName} editado`)
            handleGetAtletas()

        } catch (error) {
            console.error("Erro na requisição PUT:", error);
        }

    }

    async function handleDeleteAtletas(atleta: AtletasProps, event: React.MouseEvent) {

        const row = (event.currentTarget as HTMLElement).closest('tr');

        const dataUser = {
            firstName: (row?.querySelector('input[name="firstName"]') as HTMLInputElement).value,
            lastName: (row?.querySelector('input[name="lastName"]') as HTMLInputElement).value,
        };

        const confirmDelete = confirm(`Deseja deletar o atleta: ${dataUser.firstName} ${dataUser.lastName}?`)

        if (!confirmDelete) return

        try {

            const response = await fetch(`${RoutesURL.API_ATLETAS}/${atleta.id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            })

            if (!response.ok) {
                alert(`Não foi possível deletar o atleta: ${dataUser.firstName} ${dataUser.lastName}`)
                return
            }

            alert(`Atleta: ${dataUser.firstName} ${dataUser.lastName} Deletado`)
            handleGetAtletas()

        } catch (error) {
            console.error("Erro ao deletar: ", error);
            alert("Erro de conexão ao tentar deletar.");
        }

    }

    async function handleGetConfig() {

        try {

            const response = await fetch(RoutesURL.API_CONFIG, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            })

            if (!response.ok) {
                alert("Falha ao buscar configuração no banco de dados")
                return
            }

            const data = await response.json()

            if (data.horarios) {
                setConfigAgendamento(prev => ({
                    ...prev,    
                    ...data.horarios
                }));
            }

            if (data.dias) {
                setDiasAtivos(prev => ({
                    ...prev,
                    ...data.dias
                }));
            }

        } catch (error) {
            alert("Falha ao buscar configuração no banco de dados")
            return
        }

    }

    async function handlePostConfig() {

        const configuracaoParaSalvar = Object.keys(configAgendamento)
            .reduce((acc, dia) => {
                if (diasAtivos[dia]) {
                    acc[dia] = configAgendamento[dia];
                } else {
                    acc[dia] = [];
                }
                return acc;
            }, {} as Record<string, string[]>)

        try {
            const response = await fetch(RoutesURL.API_CONFIG, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    dias: diasAtivos,
                    horarios: configuracaoParaSalvar
                })
            })

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Erro: ${errorData.error || "Falha ao salvar"}`);
                return
            }


            handleGetConfig()

            alert("Configurações de agendamento salvas com sucesso!")


        } catch (error) {

            console.error("Erro ao salvar:", error);
            alert("Erro de conexão ao tentar salvar as configurações.")

        }

    }

    useEffect(() => {
        handleGetConfig()
        handleGetAtletas()
    }, [])


    const addHorarioAoDia = (dia: string) => {
        setConfigAgendamento(prev => ({
            ...prev,
            [dia]: [...prev[dia], "00:00"].sort()
        }));
    };

    const removeHorarioDoDia = (dia: string, index: number) => {
        setConfigAgendamento(prev => ({
            ...prev,
            [dia]: prev[dia].filter((_, i) => i !== index)
        }));
    };


    return (
        <div className="w-full flex flex-col items-center min-h-screen bg-bagre-terciaria">
            <header className="w-full max-w-[1300px] py-8 px-4">
                <h1 className="text-3xl font-bold text-bagre-primaria mb-6">Painel Administrador</h1>

                <nav className="flex gap-4 border-b p-3 bg-bagre-primaria shadow-2xs rounded-2xl">
                    <button
                        onClick={() => setAtivo("atletas")}
                        className={`pb-2 px-4 transition-all cursor-pointer border-b-2  ${ativo === "atletas" ? "flex-1 border-bagre-secundaria text-bagre-terciaria font-bold" : "text-bagre-terciaria"}`}
                    >
                        Atletas
                    </button>
                    <button
                        onClick={() => setAtivo("horarios")}
                        className={`pb-2 px-4 transition-all cursor-pointer border-b-2 ${ativo === "horarios" ? " flex-1 border-bagre-secundaria text-bagre-terciaria font-bold" : "text-bagre-terciaria"}`}
                    >
                        Horários
                    </button>
                </nav>
            </header>
            <main className="w-full max-w-[1300px] px-4" >


                {ativo === "atletas" && (
                    <section className="animate-in fade-in duration-300">
                        <div className="flex gap-2 justify-center mb-2">
                            <h2 className="text-2xl font-bold text-bagre-primaria">Gestão de Atletas</h2>
                            <span className="bg-bagre-primaria text-bagre-terciaria px-4 py-1 rounded-full text-sm font-semibold flex flex-col justify-center">
                                {atletas?.length} Total
                            </span>
                        </div>

                        <div className="bg-bagre-primaria rounded-2xl shadow-xl overflow-hidden">
                            <div className="bg-bagre-primaria rounded-2xl shadow-xl overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-bagre-secundaria ">
                                        <tr>
                                            <th className="p-1 text-[9px] font-semibold text-bagre-terciaria border border-bagre-terciaria ">Nome</th><th className="p-1 text-[9px] font-semibold text-bagre-terciaria border border-bagre-terciaria ">Sobrenome</th>
                                            <th className="p-1 text-[9px] font-semibold text-bagre-terciaria border border-bagre-terciaria ">Email</th>
                                            <th className="p-1 text-[9px] font-semibold text-bagre-terciaria border border-bagre-terciaria">Criado</th>
                                            <th className="p-1 text-[9px] font-semibold text-bagre-terciaria border border-bagre-terciaria">Cargo</th>
                                            <th className="p-1 text-[9px] font-semibold text-bagre-terciaria text-center border border-bagre-terciaria">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {atletas?.map(atleta => (
                                            <tr key={atleta.id} className="border-b border-bagre-terciaria">
                                                {/* Nome Editável */}
                                                <td className="p-1 border-r border-bagre-terciaria">
                                                    <input
                                                        type="text"
                                                        defaultValue={`${atleta.firstName}`}
                                                        name="firstName"
                                                        className="w-full bg-bagre-terciaria font-bold text-bagre-primaria text-[10px] p-1 outline-none rounded"
                                                    />
                                                </td>
                                                <td className="p-1 border-r border-bagre-terciaria">
                                                    <input
                                                        type="text"
                                                        defaultValue={`${atleta.lastName}`}
                                                        name="lastName"
                                                        className="w-full bg-bagre-terciaria font-bold text-bagre-primaria text-[10px] p-1 outline-none rounded"
                                                    />
                                                </td>

                                                {/* Email Editável */}
                                                <td className="p-1 border-r border-bagre-terciaria">
                                                    <input
                                                        type="email"
                                                        defaultValue={atleta.email}
                                                        name="email"
                                                        className="w-full bg-bagre-terciaria font-bold text-bagre-primaria text-[10px] p-1  outline-none rounded"
                                                    />
                                                </td>

                                                {/* Data (Apenas Leitura) */}
                                                <td className="p-1 text-[9px] text-center text-bagre-terciaria font-bold border-r border-bagre-terciaria">
                                                    {atleta.createdAt.split("T")[0].split("-").reverse().join("/")}
                                                </td>

                                                {/* Role (Select) */}
                                                <td className="p-1 border-r border-bagre-terciaria text-center">
                                                    <select
                                                        defaultValue={atleta.role}
                                                        name="role"
                                                        className="text-[9px] font-bold uppercase rounded-sm text-bagre-primaria bg-bagre-terciaria cursor-pointer outline-none"
                                                    >
                                                        <option value="admin">Admin</option>
                                                        <option value="user">User</option>
                                                    </select>
                                                </td>

                                                {/* Ações */}
                                                <td className="p-1 flex flex-col gap-1 items-center">
                                                    <button
                                                        onClick={(event) => handlePutAtletas(atleta, event)}
                                                        className="w-full text-[8px] bg-bagre-terciaria text-bagre-primaria hover:bg-bagre-primaria hover:text-bagre-secundaria font-bold cursor-pointer rounded p-1 hover:brightness-110"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={(event) => handleDeleteAtletas(atleta, event)}
                                                        className="w-full text-[8px] bg-bagre-terciaria text-bagre-primaria hover:bg-bagre-primaria hover:text-bagre-secundaria cursor-pointer font-bold rounded p-1 hover:brightness-110"
                                                    >
                                                        Deletar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                )}

                {ativo === "horarios" && (
                    <section className="animate-in fade-in duration-300 w-full flex flex-col items-center">
                        <div className="bg-bagre-primaria p-6 rounded-2xl w-full max-w-4xl">
                            <h2 className="text-xl mb-4 text-bagre-terciaria text-center font-bold">
                                Configuração dos Agendamentos
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {Object.keys(configAgendamento).map((dia) => {
                                    const estaAtivo = diasAtivos[dia];

                                    return (
                                        <div
                                            key={dia}
                                            className={`transition-all duration-300 border p-4 rounded-xl mb-4 shadow-sm 
                ${estaAtivo
                                                    ? 'bg-white border-bagre-secundaria scale-100'
                                                    : 'bg-gray-200 opacity-50 scale-95 grayscale'}`}
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <h3 className={`font-bold ${estaAtivo ? 'text-bagre-primaria' : 'text-gray-500'}`}>
                                                    {dia}
                                                </h3>

                                                {/* Checkbox Estilizado ou Toggle */}
                                                <input
                                                    type="checkbox"
                                                    checked={estaAtivo}
                                                    onChange={() => setDiasAtivos(prev => ({ ...prev, [dia]: !prev[dia] }))}
                                                    className="w-5 h-5 cursor-pointer accent-bagre-secundaria"
                                                />
                                            </div>

                                            {/* Se o dia estiver ativo, mostra os horários. Se não, mostra um aviso. */}
                                            {estaAtivo ? (
                                                <div className="flex flex-col gap-2 mt-2 animate-in slide-in-from-top-2">
                                                    {configAgendamento[dia].map((hora, index) => (
                                                        <div key={index} className="flex items-center bg-bagre-primaria p-2 rounded-lg shadow-inner">
                                                            <input
                                                                type="time"
                                                                value={hora}
                                                                onChange={(e) => {
                                                                    const novos = [...configAgendamento[dia]];
                                                                    novos[index] = e.target.value;
                                                                    setConfigAgendamento({ ...configAgendamento, [dia]: novos });
                                                                }}
                                                                className="text-white text-sm bg-transparent outline-none flex-1"
                                                            />
                                                            <button
                                                                onClick={() => removeHorarioDoDia(dia, index)}
                                                                className="text-red-400 hover:text-red-200 ml-2 font-bold"
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <button
                                                        onClick={() => addHorarioAoDia(dia)}
                                                        className="text-xs font-semibold text-bagre-primaria border-2 border-dashed border-bagre-primaria/30 p-2 rounded-lg hover:bg-bagre-primaria/5 transition-colors"
                                                    >
                                                        + Adicionar Horário
                                                    </button>
                                                </div>
                                            ) : (
                                                <p className="text-[10px] text-gray-500 italic mt-4 text-center">
                                                    Sem treinos programados
                                                </p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <button
                                onClick={handlePostConfig}
                                className="mt-8 w-full py-3 bg-bagre-secundaria text-bagre-terciaria font-bold rounded-xl hover:brightness-110 transition-all"
                            >
                                SALVAR TODAS AS CONFIGURAÇÕES
                            </button>
                        </div>
                    </section>
                )}
            </main>
        </div>
    )
}