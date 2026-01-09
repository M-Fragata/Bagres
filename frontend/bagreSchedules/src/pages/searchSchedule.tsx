import { Input } from "../components/Input"
import { Button } from "../components/Button"

import search from "../assets/react.svg"

export function SearchSchedule() {
    return (
        <main className="h-screen flex flex-col items-center">
            <div className="flex w-full max-w-200 p-4">
                <div className="flex-2">
                    <Input legend="Procurar" />
                </div>
                <div className="my-1.5">
                    <Button icon={search} />
                </div>
            </div>

            <div>
                Resultado Aqui
            </div>
        </main>
    )
}