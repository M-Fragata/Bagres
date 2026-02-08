import { z } from "zod";
export declare const atletaSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    role: z.ZodEnum<{
        admin: "admin";
        user: "user";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=atletaSchema.d.ts.map