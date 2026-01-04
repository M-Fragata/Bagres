import { Input } from "../components/Input"
import { Button } from "../components/Button"


export function LoginPage() {
    return (
        <main className="bg-gray-100 w-screen h-screen flex items-center justify-center p-4">
            <section
                className="
                    bg-[url('/src/assets/hero.jpeg')] bg-cover bg-center 
                    flex flex-col items-center justify-center 
                    rounded-3xl shadow-2xl 
                    

                    w-full h-full max-h-[600px] 


                    md:w-[450px] md:h-[600px]
                "
            >
                <h1 className="text-white text-4xl font-bold mb-6">
                    Login Page
                </h1>
                <div className="w-full px-10 flex flex-col gap-4">
                    <Input legend="Atleta: " />
                    <Button title="Entrar" />
                </div>
            </section>
        </main>
    )
}