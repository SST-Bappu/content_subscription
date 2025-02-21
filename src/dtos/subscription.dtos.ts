import { z } from 'zod';

/**
 * Zod schema for validating subscription requests.
 */
export const SubscriptionSchema = z.object({
    categoryId: z.string().min(1, "categoryId is required"),
    paymentInfo: z.object({
        payment_method: z.string().min(1, "payment_method is required")
    }),
    paymentMethod: z.string().min(1, "paymentMethod is required")
});

/**
 * TypeScript type inferred from Zod schema.
 */
export type SubscriptionRequestBody = z.infer<typeof SubscriptionSchema>;
