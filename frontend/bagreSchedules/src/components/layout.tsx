import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"

export function LayoutPage() {

    const [name, setName] = useState("")

    function getNameLogged() {

        const FirstName = localStorage.getItem("@bagres:userName") || ""

        const capitalized = FirstName.charAt(0).toUpperCase() + FirstName.slice(1).toLowerCase()

        setName(capitalized)
    }

    useEffect(() => {
        getNameLogged()
    }, [])

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
        <div>
            <header className="text-white bg-blue-950">
                <div className="bg-red-950 p-2 shadow mb-2">
                    <p>Olá,</p>
                    <strong> {name}!</strong>
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