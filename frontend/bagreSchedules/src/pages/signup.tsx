import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { RoutesURL } from "../utils/routesURL"

import { Input } from "../components/Input"
import { Button } from "../components/Button"

import padlog from "../assets/padlock.png"
import person from "../assets/person.png"
import mailIcon from "../assets/mail.png"

export function SignupPage() {

    const [mail, setMail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)

    const navigate = useNavigate();

    async function handleSubmit(event: React.FormEvent) {
        setIsDisabled(true)

        event.preventDefault()

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
                    password: password,
                    confirmPassword: confirmPassword
                })
            })

            const data = await response.json()

            if (response.ok) {
                alert("Cadastro realizado com sucesso!")
                navigate("/")
            } else {
                alert(data.error || "Erro ao cadastrar atleta.")
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
            <aside className="bg-[url('/src/assets/priscila.jpeg')] bg-cover bg-center bg-no-repeat
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
                <h1 className="text-bagre-terciaria md:text-bagre-primaria text-4xl font-bold mb-6 p-4">
                    Bagres Swim Team
                </h1>
                <div className=" w-full h-full px-10 flex flex-col gap-10">
                    <Input
                        legendClassName="text-bagre-terciaria border-bagre-terciaria md:text-bagre-primaria md:border-bagre-primaria"
                        inputClassName="text-bagre-terciaria border-bagre-terciaria md:text-bagre-primaria md:border-bagre-primaria"
                        required
                        logo={mailIcon}
                        placeholder="E-mail"
                        legend="E-mail:"
                        type="email"
                        onChange={(event) => setMail(event.target.value)}
                    />
                    <div className="flex gap-1 w-full">
                        <div className="flex-1">
                            <Input
                                legendClassName="text-bagre-terciaria border-bagre-terciaria md:text-bagre-primaria md:border-bagre-primaria"
                                inputClassName="text-bagre-terciaria border-bagre-terciaria md:text-bagre-primaria md:border-bagre-primaria"
                                placeholder="Nome"
                                logo={person}
                                required
                                legend="Nome:"
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                        </div>
                        <div className="flex-1">
                            <Input
                                legendClassName="text-bagre-terciaria border-bagre-terciaria md:text-bagre-primaria md:border-bagre-primaria"
                                inputClassName="text-bagre-terciaria border-bagre-terciaria md:text-bagre-primaria md:border-bagre-primaria"
                                placeholder="Sobrenome"
                                logo={person}
                                required
                                legend="Sobrenome:"
                                onChange={(event) => setLastName(event.target.value)} />
                        </div>
                    </div>
                    <div className="flex gap-1 w-full">
                        <div className="flex-1">
                            <Input
                                legendClassName="text-bagre-terciaria border-bagre-terciaria md:text-bagre-primaria md:border-bagre-primaria"
                                inputClassName="text-bagre-terciaria border-bagre-terciaria md:text-bagre-primaria md:border-bagre-primaria"
                                placeholder="Senha"
                                required
                                logo={padlog}
                                legend="Senha:"
                                type="password"
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div
                            className="flex-1">
                            <Input
                                legendClassName="text-bagre-terciaria border-bagre-terciaria md:text-bagre-primaria md:border-bagre-primaria"
                                inputClassName="text-bagre-terciaria border-bagre-terciaria md:text-bagre-primaria md:border-bagre-primaria"
                                placeholder="Confirmar Senha"
                                required
                                logo={padlog}
                                legend="Confirmar Senha:"
                                type="password"
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </div>
                    </div>

                </div>
                <div className="flex flex-col w-full px-10">
                    <Button
                        disabled={isDisabled}
                        title={isDisabled ? "Cadastrando..." : "Cadastrar"}
                    />
                    <a className="text-bagre-terciaria md:text-bagre-primaria p-4 m-auto"
                        href="/">
                        <strong>Já possui conta?</strong>
                    </a>
                </div>

            </form>
        </main>
    )
}