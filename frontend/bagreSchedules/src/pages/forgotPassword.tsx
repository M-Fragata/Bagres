import { useState } from "react";

import { RoutesURL } from "../utils/routesURL";
import { z } from "zod";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import mailIcon from "../assets/mail.png";
import padlog from "../assets/padlock.png";

export function ForgotPasswordPage() {

    const [email, setEmail] = useState("");
    const [userExists, setUserExists] = useState(false);
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [disabled, setDisabled] = useState(false)


    async function handleForgotPassword(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const bodySchema = z.object({
            email: z.email()
        })

        const emailData = bodySchema.parse({ email });

        setDisabled(true)

        if (!userExists) {

            try {

                const response = await fetch(`${RoutesURL.API_FORGOT_PASSWORD}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(emailData)
                });

                if (!response.ok) {
                    alert("Usuário não encontrado")
                    return
                }

                setUserExists(true);

            } catch (error) {
                console.log(error)
            } finally {
                setDisabled(false)
            }

        } else {
            try {

                if (password !== confirmPassword) {
                    return alert("Senhas diferentes")
                }

                const response = await fetch(`${RoutesURL.API_FORGOT_PASSWORD}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password,
                        confirmPassword
                    })
                });

                if (!response.ok) {
                    alert("Usuário não encontrado")
                    return
                }

                alert("Senha alterada com sucesso")
                window.location.href = "/"

            } catch (error) {
                console.log(error)
            } finally {
                setDisabled(false)
            }
        }

    }

    return (
        <main className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center md:bg-gradient-to-l from-[#2F5675] to-[#040B11] bg-gradient-to-t md:p-8 p-4">
            <aside
                className="
                
                md:bg-[url('/src/assets/banano.JPG')] bg-[url('/src/assets/hero.jpeg')]
                
                bg-cover bg-right bg-no-repeat 

                md:rounded-l-3xl md:rounded-t-none rounded-t-3xl

                border border-white shadow-[0px_0px_10px_rgba(255,255,255,0.5)]
                    
                    
                    /* Responsividade Inteligente */
                    w-full 
                    md:max-w-[500px]
                    max-w-[700px] 
                    
                    /* Em vez de h-full, usamos min-h para garantir espaço sem achatar */
                    min-h-[200px]
                    md:min-h-[700px]

                    
            ">

            </aside>
            <form onSubmit={handleForgotPassword}
                className="    

                    /* Desktop */
                    md:bg-none bg-bagre-terciaria 
                    md:rounded-l-none md:rounded-r-3xl

                    rounded-b-3xl

                    flex flex-col items-center md:justify-around justify-center
                    border border-white shadow-[0px_0px_10px_rgba(255,255,255,0.5)]

                    /* Responsividade Inteligente */
                    w-full 
                    max-w-[700px] 
                    
                    /* Em vez de h-full, usamos min-h para garantir espaço sem achatar */
                    min-h-[400px] 
                    md:min-h-[700px]

                "
            >

                <h1 className="text-bagre-primaria text-3xl md:text-4xl font-bold md:mb-10">
                    Bagres Swim Team
                </h1>

                <div className="w-full md:px-10 px-5 flex flex-col gap-10 pt-15 pb-5 md:pt-0 md:pb-0">

                    {!userExists ? (
                        <>
                            <h2 className="text-bagre-primaria text-2xl font-semibold text-center">Esqueceu a senha?</h2>
                            <p className="text-bagre-primaria text-center">Insira seu e-mail para redefinir a senha.</p>
                            <Input
                                legendClassName="text-bagre-primaria border-bagre-primaria"
                                inputClassName="text-bagre-primaria border-bagre-primaria"
                                placeholder="E-mail"
                                required
                                legend="E-mail:"
                                type="email"
                                logo={mailIcon}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </>
                    ) : (
                        <>
                            <h2 className="text-bagre-primaria text-2xl font-semibold text-center">Redefinir Senha</h2>
                            <Input
                                legendClassName="text-bagre-primaria border-bagre-primaria"
                                inputClassName="text-bagre-primaria border-bagre-primaria"
                                placeholder="Nova senha"
                                required
                                legend="Nova Senha:"
                                type="password"
                                logo={padlog}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Input
                                legendClassName="text-bagre-primaria border-bagre-primaria"
                                inputClassName="text-bagre-primaria border-bagre-primaria"
                                placeholder="Confirmar senha"
                                required
                                legend="Confirmar Senha:"
                                type="password"
                                logo={padlog}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </>
                    )}

                </div>


                <div className="flex flex-col w-full md:px-10 px-6">

                    <Button
                        disabled={disabled}
                        title={!userExists ? (disabled ? "Enviando..." : "Enviar") : (disabled ? "Redefinindo..." : "Redefinir Senha")}
                    />
                    <a className="text-bagre-primaria p-4 m-auto"
                        href="/">
                        <strong>Voltar ao Login</strong>
                    </a>
                </div>
            </form>
        </main>
    )
}