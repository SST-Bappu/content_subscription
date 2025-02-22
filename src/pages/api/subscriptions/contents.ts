import {NextApiResponse} from 'next';
import {authenticate} from '@/middleware/authMiddleware';
import {AuthenticatedRequest} from "@/interfaces/auth.interface";
import {subscriptionService} from "@/services/containers";
import {errorHandler} from "@/middleware/errorHandlingMiddleware";

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        throw {status: 405, message: "Method not allowed"};
    }

    authenticate(req, res, async () => {
        const userId = req.user?.userId
        if (!userId) {
            throw {status: 401, message: "Unauthorized: user not found"};
        }
        const {status, data} = await subscriptionService.getSubscribedContent(userId);
        return res.status(status).json({success: true, data: data});
    });

}
export default errorHandler(handler)