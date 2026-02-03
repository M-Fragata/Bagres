import { z } from "zod";
export const scheduleSchema = z.object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    hour: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (HH:MM)"),
    date: z.string().transform((str, ctx) => {
        // 1. Divide a string por hífen ou barra
        const parts = str.split(/[-/]/);
        if (parts.length !== 3) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Formato de data inválido. Use DD/MM/AAAA ou AAAA-MM-DD",
            });
            return z.NEVER;
        }
        const values = parts.map(Number);
        // Inicializamos com 0 para o TypeScript ficar feliz
        let day = 0;
        let month = 0;
        let year = 0;
        // Usamos o operador ?? para garantir que se a posição não existir, use 0
        const firstValue = values[0] ?? 0;
        if (firstValue > 1000) {
            // Padrão AAAA-MM-DD
            year = values[0] ?? 0;
            month = values[1] ?? 0;
            day = values[2] ?? 0;
        }
        else {
            // Padrão DD/MM/AAAA
            day = values[0] ?? 0;
            month = values[1] ?? 0;
            year = values[2] ?? 0;
        }
        // 3. Valida se a data é real
        const dateObj = new Date(year, month - 1, day);
        if (isNaN(dateObj.getTime()) || year === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Data inválida ou mal formatada",
            });
            return z.NEVER;
        }
        // 4. RETORNO FINAL: Transformamos de volta para String (ISO puro)
        // Isso garante que o banco salve sempre como "2026-02-01"
        const formattedMonth = String(month).padStart(2, '0');
        const formattedDay = String(day).padStart(2, '0');
        return `${year}-${formattedMonth}-${formattedDay}`;
    }),
});
//# sourceMappingURL=privateSchema.js.map