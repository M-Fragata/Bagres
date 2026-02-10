import { z } from "zod"

export const configSchema = z.object({
  dias: z.array(z.string()),
  horarios: z.array(z.string())
})
