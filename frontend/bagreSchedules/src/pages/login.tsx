import { useState } from "react"
import { useNavigate } from "react-router-dom";

import { Input } from "../components/Input"
import { Button } from "../components/Button"


const API_URL = "http://localhost:3333/login"

export function LoginPage() {

    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();


    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        console.log({ mail, password })

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    email: mail,
                    password: password
                })
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem("@MeuApp:user", JSON.stringify(data.atleta));

                localStorage.setItem("@MeuApp:token", data.token);
                
                alert(`Bem-vindo, ${data.atleta.name}!`);

                window.location.assign("/");
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