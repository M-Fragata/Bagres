import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { ButtonIcon } from "./ButtonIcon"

import bagres_logo from "../assets/logo_bagres.png"
import menu from "../assets/menu.png"

export function LayoutPage() {
    const navigate = useNavigate()
    const location = useLocation()

    const [navbar, setNavbar] = useState(false)
    const [name, setName] = useState("")
    const [admin, setAdmin] = useState(false)

    const getFormattedName = (() => {
        // Esta função roda no momento em que o componente é montado
        const firstName = localStorage.getItem("@bagres:userName") || "";
        if (firstName) {
            return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
        }
        return "";
    });

    useEffect(() => {
        // Atualiza o nome sempre que a rota mudar (location)
        // ou quando houver o evento de storage (outras abas)
        const updateName = () => {
            setName(getFormattedName());
        };
        updateName();

        const user = JSON.parse(localStorage.getItem("@bagres:user") || "{}")
        setAdmin(user.role === "admin")

        window.addEventListener('storage', updateName);
        return () => window.removeEventListener('storage', updateName);
    }, [location])


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
        <div className="flex flex-col h-screen w-full overflow-x-hidden">
            <header className="text-white bg-bagre-primaria w-full flex justify-center h-17 shrink-0 sticky top-0 z-[60]">
                <div className=" shadow pl-7 pr-7 w-full h-full max-w-325 flex justify-between items-center">
                    <div>
                        <img src={bagres_logo} className="w-5.5" />
                    </div>
                    <div className="flex gap-6 items-center">
                        <div className="flex">
                            <span>Olá, <strong>{name}!</strong></span>
                        </div>

                        <div>
                            <ButtonIcon
                                icon={menu}
                                onClick={() => setNavbar(!navbar)}
                            />
                        </div>

                        <div className={`absolute right-0 top-16 m-auto pb-5 bg-bagre-primaria w-full z-50 transition-all duration-300 ease-in-out ${navbar ? "max-h-[300px] opacity-100 visible" : "max-h-0 opacity-0 invisible"}`} >
                            <div className="flex flex-col gap-3">
                                
                                <button className="cursor-pointer"><a href="https://m-fragata.github.io/BST-projeto/frontend/src/" target="_blank">Início</a> </button>

                                <button className="cursor-pointer" onClick={() => {
                                    navigate("/")
                                    setNavbar(false)
                                }}
                                >Novo Agendamento</button>

                                <button className="cursor-pointer" onClick={() => {
                                    navigate("/search")
                                    setNavbar(false)
                                }}>Meus agendamentos</button>

                                <button className="cursor-pointer" onClick={handleLogout}>Sair</button>

                                {admin && (<button className="cursor-pointer" onClick={() => navigate("/admin")}>Administrador</button>)}
                            </div>
                        </div>
                    </div>
                </div>

            </header>
            <main className="flex-1 flex flex-col bg-bagre-terciaria">
                <Outlet />
            </main>
            <footer className="text-white bg-bagre-primaria flex justify-center p-3 shrink-0 text-[11px] mobile:text-sm">
                <p><strong>© 2026 Bagres Swim Team.</strong> All rights reserved. Since 2023.</p>
            </footer>
        </div>
    )
}