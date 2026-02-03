import { z } from "zod";
export declare const scheduleSchema: z.ZodObject<{
    name: z.ZodString;
    hour: z.ZodString;
    date: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
}, z.core.$strip>;
//# sourceMappingURL=privateSchema.d.ts.map