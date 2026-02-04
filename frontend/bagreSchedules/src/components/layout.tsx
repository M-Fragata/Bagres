import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function LayoutPage() {
    const navigate = useNavigate()

    const [name, setName] = useState(() => {
        // Esta função roda no momento em que o componente é montado
        const firstName = localStorage.getItem("@bagres:userName") || "";
        if (firstName) {
            return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
        }
        return "";
    });

    useEffect(() => {
        // Função para atualizar o nome
        const updateName = () => {
            const firstName = localStorage.getItem("@bagres:userName") || "";
            if (firstName) {
                setName(firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase());
            }
        };

        // Escuta mudanças no localStorage vindas de outras abas/páginas
        window.addEventListener('storage', updateName);

        // Como o 'storage' às vezes não pega mudanças na mesma aba,
        // garantimos a atualização quando o componente focar ou montar
        updateName();

        return () => window.removeEventListener('storage', updateName);
    }, []);

    function handleLogout() {

        const confirm = window.confirm("Tem certeza que deseja sair?")

        if (!confirm) {
            return
        }

        localStorage.removeItem("@bagres:token");
        localStorage.removeItem("@bagres:user");
        localStorage.removeItem("@bagres:userName");
        window.location.href = "/";
    }

    return (
        <div className="flex flex-col h-screen w-screen">
            <header className="text-white bg-red-950 w-full flex justify-center">
                <div className="bg-red-950 p-2 shadow mb-2 w-full max-w-325 flex justify-between items-center">
                    <div className="flex">
                        <span>Olá, <strong>{name}!</strong></span>
                    </div>
                    <div className="flex gap-3">
                        <button className="cursor-pointer" onClick={() => navigate("/")}>Agendar</button>
                        <button className="cursor-pointer" onClick={() => navigate("/search")}>Meus agendamentos</button>
                        <button className="cursor-pointer" onClick={handleLogout}>Sair</button>
                    </div>
                </div>

            </header>
            <div className="flex-1 overflow-y-auto">
                <Outlet />
            </div>
            <footer className="text-white bg-blue-950 flex justify-center p-3">
                <strong>C 2025 Bagres Swim Team</strong>. All rights reserved. Since 2023
            </footer>
        </div>
    )
}