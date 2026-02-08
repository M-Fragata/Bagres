import { z } from "zod"

// Schema para CRIAR CONTA
export const atletaSchema = z.object({
  firstName: z.string().min(3, "Nome é obrigatório"),
  lastName: z.string().min(3, "Sobrenome é obrigatório"),
  email: z.string().email("Email inválido"),
  role: z.enum(["admin", "user"])
})
