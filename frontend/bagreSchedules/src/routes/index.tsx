import { useState } from "react"
import { BrowserRouter } from "react-router-dom"

import { AdmRoutes } from "./AdmRoutes"
import { UserRoutes } from "./UserRoutes"
import { AuthRoutes } from "./AuthRoutes"


export function Routes() {
    // 1. Criamos um estado para o usuário. 
    // Começamos tentando ler o que está salvo no navegador.

    const [user, setUser] = useState(() => {
        // Agora usamos a mesma chave: @bagres:user
        const storageUser = localStorage.getItem("@bagres:user");

        if (storageUser) {
            try {
                return JSON.parse(storageUser);
            } catch (error) {
                return { role: "" };
            }
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