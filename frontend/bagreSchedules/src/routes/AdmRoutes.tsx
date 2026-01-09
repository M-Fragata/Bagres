import { Routes, Route } from "react-router-dom"

import { LayoutPage } from "../components/layout"

import { Schedule } from "../pages/schedule"
import { SearchSchedule } from "../pages/searchSchedule"
import { NotFoundPage } from "../pages/notFound"

export function AdmRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LayoutPage/>}>
                <Route path="/" element={ <Schedule /> } />
                <Route path="/search" element={ <SearchSchedule />} />
            </Route>

            <Route path="*" element={ <NotFoundPage /> } />
        </Routes>
    )
}