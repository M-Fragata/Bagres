import { useState } from "react"
import { Input } from "../components/Input"
import { Button } from "../components/Button"

import search from "../assets/react.svg"

export function SearchSchedule() {

    const [date, setDate] = useState(new Date().toISOString().split("T")[0])

    async function handleGetSchedules() {
        try {
            
        } catch (error) {
            
        }
    }

    return (
        <main className="h-screen flex flex-col items-center">
            <div className="flex w-full max-w-200 p-4">
                <div className="flex w-full">
                    <div className="flex-2">
                        <Input legend="Procurar" />
                    </div>
                    <div className="flex-1 mx-2">
                        <Input 
                        value={date}
                        legend="date" 
                        type="date" 
                        onChange={(event) => setDate(event.target.value)} />
                    </div>
                </div>
                <div className="my-1.5">
                    <Button icon={search} />
                </div>
            </div>

            <div className="w-full max-w-200 p-4">
                Resultado Aqui
            </div>
        </main>
    )
}