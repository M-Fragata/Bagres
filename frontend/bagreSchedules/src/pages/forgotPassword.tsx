import { useState } from "react";

import { RoutesURL } from "../utils/routesURL";
import { z } from "zod";

export function ForgotPasswordPage() {

    const [email, setEmail] = useState("");
    const [userExists, setUserExists] = useState(false);

    async function handleForgotPassword(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const bodySchema = z.object({
            email: z.email()
        })

        try {
        
            const emailData = bodySchema.parse({email});

            const response = await fetch(`${RoutesURL.API_FORGOT_PASSWORD}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ emailData })
            });

            const data = await response.json()

            if(response.ok) {
                alert(data.message);
                setUserExists(true);
            } else {

        } catch (error) {
            
        }

    }

    return (
        <div>
            <h1>Esqueceu a senha?</h1>
            <p>Insira seu e-mail para redefinir a senha.</p>
            <form onSubmit={handleForgotPassword}>
                <input type="email" placeholder="E-mail" required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}