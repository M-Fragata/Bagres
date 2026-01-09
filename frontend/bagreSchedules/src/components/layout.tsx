import { Outlet } from "react-router-dom"

export function LayoutPage() {
    return (
        <div>
            <header className="text-white bg-blue-950">
                <div className="bg-red-950 p-2 shadow mb-2">
                    <p>Olá,</p>
                    <strong> Matheus!</strong>
                </div>
                <Outlet />
            </header>
            <footer className="text-white bg-blue-950 flex justify-center p-3">
                <strong>C 2025 Bagres Swim Team</strong>. All rights reserved. Since 2023
            </footer>
        </div>
    )
}