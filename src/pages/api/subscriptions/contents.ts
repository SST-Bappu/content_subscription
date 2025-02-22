import {NextApiResponse} from 'next';
import {authenticate} from '@/middleware/authMiddleware';
import {AuthenticatedRequest} from "@/interfaces/auth.interface";
import {subscriptionService} from "@/services/containers";

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({error: "Method not allowed"});
    }

    try {
        authenticate(req, res, async () => {
            const userId = req.user?.userId
            if (!userId) {
                return res.status(401).json({error: "Unauthorized: User not found"});
            }
            const {status, data} = await subscriptionService.getSubscribedContent(userId);
            return res.status(status).json({success: true, data: data});
        });
    } catch (error: unknown) {
        console.error("Error fetching contents:", error);

        if (error instanceof Error) {
            return res.status(500).json({error: `Internal Server Error: ${error.message}`});
        }

        return res.status(500).json({error: "Internal Server Error"});
    }
}
