import { useActionState } from "react"
import { z, ZodError } from 'zod'

import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { RoutesURL, token } from "../utils/routesURL"

import padlog from "../assets/padlock.png"
import person from "../assets/person.png"

const loginSchema = z.object({
    email: z.email(),
    password: z.string()
})

export function LoginPage() {

    const [state, formAction, isDisabled] = useActionState(handleSubmit, {
        message: null,
        payload: {
            email: "",
            password: ""
        }
    })

    async function handleSubmit(_: any, formData: FormData) {

        const payload = {
            email: formData.get("email") as string,
            password: formData.get("password") as string
        }

        try {
            const login = loginSchema.parse(payload)

            const response = await fetch(RoutesURL.API_LOGIN, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: login.email,
                    password: login.password
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

                return { message: null, payload: null }
            } else {
                return { message: data.error || "E-mail ou senha incorretos.", payload };
            }

        } catch (error) {

            if (error instanceof ZodError) {
                return { message: error.issues[0].message, payload }
            }

            return { message: "Erro ao entrar, tente novamente em alguns segundos.", payload };
        }
    }

    return (
        <main className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center bg-gradient-to-l from-[#2F5675] to-[#040B11] md:p-8 p-4">
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
            <form action={formAction}
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

                        <Input
                            legendClassName="text-bagre-primaria border-bagre-primaria"
                            inputClassName="text-bagre-primaria border-bagre-primaria"
                            placeholder="E-mail"
                            required
                            legend="E-mail:"
                            type="email"
                            logo={person}
                            name="email"
                            defaultValue={state.payload?.email}
                        />

                        <Input
                            legendClassName="text-bagre-primaria border-bagre-primaria"
                            inputClassName="text-bagre-primaria border-bagre-primaria"
                            placeholder="Senha"
                            required
                            legend="Senha:"
                            type="password"
                            logo={padlog}
                            name="password"
                            defaultValue={state.payload?.password}
                        />

                <p className="text-red-500 text-sm m-auto">{state?.message}</p>

                </div>


                <div className="flex flex-col w-full md:px-10 px-6">

                    <Button
                        disabled={isDisabled}
                        title={isDisabled ? "Entrando..." : "Entrar"}
                    />
                    <a className="text-bagre-primaria p-4 m-auto"
                        href="/signup">
                        <strong>Não possui conta?</strong>
                    </a>
                </div>
            </form>
        </main>
    )
}