import { useActionState } from "react"
import { z, ZodError } from 'zod'
import { useNavigate } from "react-router-dom";
import { RoutesURL } from "../utils/routesURL"

import { Input } from "../components/Input"
import { Button } from "../components/Button"

import padlog from "../assets/padlock.png"
import person from "../assets/person.png"
import mailIcon from "../assets/mail.png"

const signupSchema = z.object({
    email: z.email(),
    firstName: z.string().trim().min(3, "O nome deve ter no mínimo 3 caracteres"),
    lastName: z.string().trim().min(3, "O sobrenome deve ter no mínimo 3 caracteres"),
    password: z.string().trim().min(6, "A Senha deve conter ao menos 6 caracteres"),
    confirmPassword: z.string().trim().min(6)
})

export function SignupPage() {


    const [state, formAction, isDisabled] = useActionState(handleSubmit, {
        message: null,
        payload: {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: ""
        }
    })

    const navigate = useNavigate();

    async function handleSubmit( _: any, formData: FormData ) {
        
        const payload = {
            email: formData.get("email") as string,
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            password: formData.get("password") as string,
            confirmPassword: formData.get("confirmPassword") as string
        }

        try {

            const signup = signupSchema.parse(payload)

            if (signup.password !== signup.confirmPassword) {
                return { message: "Senhas diferentes", payload }
            }


            const response = await fetch(RoutesURL.API_SESSION, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    firstName: signup.firstName,
                    lastName: signup.lastName,
                    email: signup.email,
                    password: signup.password,
                    confirmPassword: signup.confirmPassword
                })
            })

            const data = await response.json()

            if (response.ok) {
                alert("Cadastro realizado com sucesso!")
                navigate("/")
                return {message: null, payload: null}
            } else {
                return {message: data.error || "Erro ao cadastrar, tente novamente em alguns segundos!", payload}
            }

        } catch (error) {

            if (error instanceof ZodError) {
                return { message: error.issues[0].message, payload }
            }

            return {message: "Erro ao cadastrar, tente novamente em alguns segundos!", payload}
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
            <form action={formAction}
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
                        name="email"
                        defaultValue={state.payload?.email}
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
                                name="firstName"
                                defaultValue={state.payload?.firstName}
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
                                name="lastName"
                                defaultValue={state.payload?.lastName}
                            />
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
                                name="password"
                                defaultValue={state.payload?.password}
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
                                name="confirmPassword"
                                defaultValue={state.payload?.confirmPassword}
                            />
                        </div>
                    </div>

                    <p className="text-red-500 text-sm m-auto">{state?.message}</p>

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