import { Routes, Route } from "react-router-dom"

import { Schedule } from "../pages/schedule"
import { SearchSchedule } from "../pages/searchSchedule"
import { LayoutPage } from "../components/layout"
import { NotFoundPage } from "../pages/notFound"

export function UserRoutes() {
    return (
        <Routes>
            <Route path="/" element={ <LayoutPage /> }>
                <Route path="/" element={ <Schedule /> } />
                <Route path="/search" element={ <SearchSchedule /> } />
            </Route>

            <Route path="*" element={ <NotFoundPage /> } />
        </Routes>
    )
}