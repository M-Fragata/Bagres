import { Outlet } from "react-router-dom"

export function LayoutPage() {


    function handleLogout() {

        const confirm = window.confirm("Tem certeza que deseja sair?")

        if (!confirm) {
            return
        }

        localStorage.removeItem("@MeuApp:user");
        localStorage.removeItem("@MeuApp:token");
        window.location.assign("/");
    }

    return (
        <div>
            <header className="text-white bg-blue-950">
                <div className="bg-red-950 p-2 shadow mb-2">
                    <p>Olá,</p>
                    <strong> Matheus!</strong>
                    <button className="cursor-pointer" onClick={handleLogout}>Logout</button>
                </div>
                <Outlet />
            </header>
            <footer className="text-white bg-blue-950 flex justify-center p-3">
                <strong>C 2025 Bagres Swim Team</strong>. All rights reserved. Since 2023
            </footer>
        </div>
    )
}