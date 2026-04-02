import { useState } from "react"

import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { RoutesURL, token } from "../utils/routesURL"

import padlog from "../assets/padlock.png"
import person from "../assets/person.png"

export function LoginPage() {

    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        setIsDisabled(true)

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
            setIsDisabled(false)
        } catch (error) {
            console.error(error)
            setIsDisabled(false)
            alert("Falha ao conectar com o servidor.")
        }
    }

    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-bagre-primaria p-2">
            <aside
                className="bg-[url('/src/assets/priscila.jpeg')] bg-cover bg-center bg-no-repeat
            rounded-l-3xl border border-white shadow-[0px_0px_10px_rgba(255,255,255,0.5)]
                                    /* Responsividade Inteligente */
                    w-full 
                    max-w-[700px] 
                    
                    /* Em vez de h-full, usamos min-h para garantir espaço sem achatar */
                    min-h-[600px] 
                    md:min-h-[700px]

                    hidden md:block
            ">

            </aside>
            <form onSubmit={handleSubmit}
                className="

                    /* Mobile */
                    bg-[url('/src/assets/hero.jpeg')] bg-cover bg-center 
                rounded-3xl

                    /* Desktop */
                    md:bg-none md:bg-bagre-terciaria 
                    md:rounded-l-none md:rounded-r-3xl

                    flex flex-col items-center justify-around
                    border border-white shadow-[0px_0px_10px_rgba(255,255,255,0.5)]

                    /* Responsividade Inteligente */
                    w-full 
                    max-w-[700px] 
                    
                    /* Em vez de h-full, usamos min-h para garantir espaço sem achatar */
                    min-h-[600px] 
                    md:min-h-[700px]

                "
            >

                <h1 className="text-bagre-terciaria md:text-bagre-primaria text-4xl font-bold mb-10 p-4">
                    Bagres Swim Team
                </h1>

                <div className="w-full px-10 flex flex-col gap-10">

                    <Input
                        legendClassName="text-bagre-terciaria border-bagre-terciaria md:text-bagre-primaria md:border-bagre-primaria"
                        inputClassName="text-bagre-terciaria border-bagre-terciaria md:text-bagre-primaria md:border-bagre-primaria"
                        placeholder="E-mail"
                        required
                        legend="E-mail:"
                        type="email"
                        logo={person}
                        onChange={(event) => setMail(event.target.value)}
                    />

                    <Input
                        legendClassName="text-bagre-terciaria border-bagre-terciaria md:text-bagre-primaria md:border-bagre-primaria"
                        inputClassName="text-bagre-terciaria border-bagre-terciaria md:text-bagre-primaria md:border-bagre-primaria"
                        placeholder="Senha"
                        required
                        legend="Senha:"
                        type="password"
                        logo={padlog}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                </div>
                <div className="flex flex-col w-full px-10">

                    <Button
                        disabled={isDisabled}
                        title={isDisabled ? "Entrando..." : "Entrar"}
                    />
                    <a className="text-bagre-terciaria md:text-bagre-primaria p-4 m-auto"
                        href="/signup">
                        <strong>Não possui conta?</strong>
                    </a>
                </div>
            </form>
        </main>
    )
}