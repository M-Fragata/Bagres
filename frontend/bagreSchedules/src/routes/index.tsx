import { useState, useEffect } from "react"
import { BrowserRouter } from "react-router-dom"

import { AdmRoutes } from "./AdmRoutes"
import { UserRoutes } from "./UserRoutes"
import { AuthRoutes } from "./AuthRoutes"


export function Routes() {
    // 1. Criamos um estado para o usuário. 
    // Começamos tentando ler o que está salvo no navegador.
    const [user, setUser] = useState(() => {
        const storageUser = localStorage.getItem("@MeuApp:user");
        if (storageUser) {
            return JSON.parse(storageUser);
        }
        return { role: "" };
    });

    // 2. A lógica de qual "grupo" de rotas mostrar
    function AccessRoute() {
        switch (user.role) {
            case "admin":
                return <AdmRoutes />
            case "user":
                return <UserRoutes />
            default:
                return <AuthRoutes />
        }
    }

    return (
        <BrowserRouter>
            <AccessRoute />
        </BrowserRouter>
    )
}