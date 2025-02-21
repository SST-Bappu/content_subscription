import {NextApiResponse} from 'next';
import {SubscriptionService} from '@/services/subscriptionService';
import {authenticate} from '@/middleware/authMiddleware';

import {AuthenticatedRequest} from "@/interfaces/auth.interface";
import {SubscriptionRequestBody, SubscriptionSchema} from "@/dtos/subscription.dtos";
import {formatZodErrors} from "@/utils/zod.error.validator";

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({error: "Method not allowed"});
    }

    try {
        authenticate(req, res, async () => {
            // Validate Request Body Using `zod`
            const validation = SubscriptionSchema.safeParse(req.body);

            if (!validation.success) {
                return res.status(400).json({error: formatZodErrors(validation.error)});
            }

            // Extract Validated Data
            const {categoryId, paymentInfo, paymentMethod}: SubscriptionRequestBody = validation.data;
            const userId = req.user?.userId;

            if (!userId) {
                return res.status(401).json({error: "Unauthorized: User not found"});
            }

            // Process Subscription
            const {status, data} = await SubscriptionService.subscribe(userId, categoryId, paymentInfo, paymentMethod);
            return res.status(status).json(data);
        });
    } catch (error: unknown) {
        console.error("Subscription Error:", error);

        if (error instanceof Error) {
            return res.status(500).json({error: `Internal Server Error: ${error.message}`});
        }

        return res.status(500).json({error: "Internal Server Error"});
    }
}
