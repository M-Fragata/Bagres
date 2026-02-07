import { BrowserRouter } from "react-router-dom"

import { AdmRoutes } from "./AdmRoutes"
import { UserRoutes } from "./UserRoutes"
import { AuthRoutes } from "./AuthRoutes"


export function Routes() {

    const storageUser = localStorage.getItem("@bagres:user");
    
    const user = storageUser ? JSON.parse(storageUser) : { role: "" };

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