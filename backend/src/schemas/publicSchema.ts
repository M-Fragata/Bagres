import { z } from "zod"

// Schema para CRIAR CONTA
export const registerSchema = z.object({
  firstName: z.string().min(2, "Nome é obrigatório"),
  lastName: z.string().min(2, "Sobrenome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"], // Indica que o erro é neste campo
})

// Schema para LOGIN
// Sim, é bom ter! Ele garante que o código só tente buscar no banco
// se os dados básicos (email e senha) estiverem presentes.
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória")
})