import { Routes, Route } from "react-router-dom"

import { LoginPage } from "../pages/login"
import { SignupPage } from "../pages/signup"
import { NotFoundPage } from "../pages/notFound"

export function AuthRoutes() {
    return (
        <Routes>
            <Route>
                <Route path="/" element={ <LoginPage /> } />
                <Route path="/signup" element={ <SignupPage /> } />
            </Route>

            <Route path="*" element={ <NotFoundPage /> } />

        </Routes>
    )
}