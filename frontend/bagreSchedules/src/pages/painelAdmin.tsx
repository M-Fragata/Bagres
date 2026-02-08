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

    useEffect(() => {
        handleGetAtletas()
    }, [])


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
                    <section className="animate-in fade-in duration-300">
                        <h2 className="text-xl mb-4">Configuração de Grade</h2>

                        <p className="text-gray-500 italic">Aqui entrará a gestão de slots (09:30, 09:45) e dias da semana.</p>
                    </section>
                )}
            </main>
        </div>
    )
}