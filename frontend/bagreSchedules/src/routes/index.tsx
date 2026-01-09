import { BrowserRouter } from "react-router-dom"

import { AdmRoutes } from "./AdmRoutes"
import { UserRoutes } from "./UserRoutes"
import { AuthRoutes } from "./AuthRoutes"


const session = {
    user: {
        role: ""
    },
}

export function Routes() {
    function Route() {
        switch (session?.user.role) {
            case "admin":
                return < AdmRoutes />
            case "user":
                return < UserRoutes />
            default:
                return < AuthRoutes />
        }
    }

    return (
        <BrowserRouter>
            <Route />
        </BrowserRouter>
    )
}