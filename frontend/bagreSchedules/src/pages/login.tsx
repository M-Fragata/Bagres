import { useState } from "react"

import { Input } from "../components/Input"
import { Button } from "../components/Button"


export function LoginPage() {

    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        console.log({ mail, password })
    }

    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-blue-950 p-2">
            <form onSubmit={handleSubmit}
                className="
                    bg-[url('/src/assets/hero.jpeg')] bg-cover bg-center bg-no-repeat
                    flex flex-col items-center justify-center
                    rounded-3xl border border-white shadow-[0px_0px_10px_rgba(255,255,255,0.5)]

                    /* Responsividade Inteligente */
                    w-full 
                    max-w-[700px] 
                    
                    /* Em vez de h-full, usamos min-h para garantir espaço sem achatar */
                    min-h-[600px] 
                    md:min-h-[700px]
                "
            >
                <h1 className="text-white text-4xl font-bold mb-10 p-4">
                    Login Page
                </h1>
                <div className="w-full px-10 flex flex-col gap-4">
                    <Input
                        required
                        legend="E-mail:"
                        type="email"
                        onChange={(event) => setMail(event.target.value)}
                    />
                    <Input
                        required
                        legend="Senha:"
                        type="password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <Button
                        title="Entrar"
                    />
                </div>
                <a className="text-white p-4"
                    href="/signup">
                    <strong>Não possui conta?</strong>
                </a>
            </form>
        </main>
    )
}