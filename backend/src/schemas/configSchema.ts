import { z } from "zod"

export const configSchema = z.object({
  dias: z.record(z.string(), z.boolean()),
  horarios: z.record(z.string(), z.array(z.string()))
})
