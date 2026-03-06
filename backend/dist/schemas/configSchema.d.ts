import { z } from "zod";
export declare const configSchema: z.ZodObject<{
    dias: z.ZodRecord<z.ZodString, z.ZodBoolean>;
    horarios: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
//# sourceMappingURL=configSchema.d.ts.map