import { z } from 'zod';

/**
 * Zod schema for validating subscription requests.
 */
export const SubscriptionSchema = z.object({
    categoryId: z.string().min(1, { message: "categoryId is required" }),
    paymentInfo: z.object({
        payment_method: z.string().min(1, { message: "payment_method is required" }),
    }),
    paymentMethod: z.string().min(1, { message: "paymentMethod is required" }),
});

/**
 * TypeScript type inferred from SubscriptionSchema.
 */
export type SubscriptionRequestBody = z.infer<typeof SubscriptionSchema>;
