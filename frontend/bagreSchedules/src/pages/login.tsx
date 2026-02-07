import { useState } from "react"

import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { RoutesURL } from "../utils/routesURL"

const token = localStorage.getItem("@bagres:token");

export function LoginPage() {

    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        try {
            const response = await fetch(RoutesURL.API_LOGIN, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: mail,
                    password: password
                })
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem("@bagres:token", data.token);

                // Salve o objeto inteiro do atleta (que tem a role: "user")
                localStorage.setItem("@bagres:user", JSON.stringify(data.atleta));

                // Armazenando o nome do usuário
                localStorage.setItem("@bagres:userName", data.atleta.name.split(" ")[0]);

                alert(`Bem-vindo, ${data.atleta.name}!`);

                // Use o reload para forçar o App.tsx a ler o localStorage de novo
                window.location.href = "/";
            } else {
                alert(data.error || "E-mail ou senha incorretos.");
            }
        } catch (error) {
            console.error(error)
            alert("Falha ao conectar com o servidor.")
        }
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
                        legendClassName="text-white"
                        inputClassName="text-white"
                        required
                        legend="E-mail:"
                        type="email"
                        onChange={(event) => setMail(event.target.value)}
                    />
                    <Input
                        legendClassName="text-white"
                        inputClassName="text-white"
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