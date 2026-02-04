import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { RoutesURL } from "../utils/routesURL"

import { Input } from "../components/Input"
import { Button } from "../components/Button"


export function SignupPage() {

    const [mail, setMail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate();

    async function handleSubmit(event: React.FormEvent) {

        event.preventDefault()
        console.log({ mail, firstName, lastName, password, confirmPassword })

        try {

            const response = await fetch(RoutesURL.API_SESSION, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: mail,
                    password: password
                })
            })

            const data = await response.json()

            if (response.ok) {
                alert("Cadastro realizado com sucesso!")
                navigate("/")
            } else {
                alert(data.error || "Erro ao cadastrar atleta.")
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
                <h1 className="text-white text-4xl font-bold mb-6 p-4">
                    Signup Page
                </h1>
                <div className="w-full px-10 flex flex-col gap-4">
                    <Input
                        required
                        legend="E-mail:"
                        type="email"
                        onChange={(event) => setMail(event.target.value)}
                    />
                    <div className="flex gap-1 w-full">
                        <div className="flex-1">
                            <Input
                                required
                                legend="Nome:"
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                        </div>
                        <div className="flex-1">
                            <Input
                                required
                                legend="Sobrenome:"
                                onChange={(event) => setLastName(event.target.value)} />
                        </div>
                    </div>
                    <div className="flex gap-1 w-full">
                        <div className="flex-1">
                            <Input
                                required
                                legend="Senha:"
                                type="password"
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div
                            className="flex-1">
                            <Input
                                required
                                legend="Confirmar Senha:"
                                type="password"
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </div>
                    </div>
                    <Button title="Entrar" />
                </div>
                <a className="text-white p-4"
                    href="/">
                    <strong>Já possui conta?</strong>
                </a>
            </form>
        </main>
    )
}