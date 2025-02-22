import {NextApiResponse} from 'next';
import {authenticate} from '@/middleware/authMiddleware';

import {AuthenticatedRequest} from "@/interfaces/auth.interface";
import {SubscriptionRequestBody, SubscriptionSchema} from "@/dtos/subscription.dtos";
import {formatZodErrors} from "@/utils/zod.error.validator";
import {subscriptionService} from "@/services/containers";
import {errorHandler} from "@/middleware/errorHandlingMiddleware";

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        throw {status: 405, message: "Method not allowed"};
    }

    // Validate Request Body Using `zod`
    const validation = SubscriptionSchema.safeParse(req.body);

    if (!validation.success) {
        throw {status: 400, message: formatZodErrors(validation.error)};
    }

    // Extract Validated Data
    const {categoryId, paymentInfo, paymentGateway}: SubscriptionRequestBody = validation.data;
    const userId = req.user?.userId;

    if (!userId) {
        throw {status: 401, message: "Unauthorized: User not found"};
    }
    // Process Subscription
    const {status, data} = await subscriptionService.subscribe(userId, categoryId, paymentInfo, paymentGateway);
    return res.status(status).json(data);


}

export default errorHandler(authenticate(handler))