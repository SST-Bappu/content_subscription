import { NextApiResponse } from 'next';
import { authenticate } from '@/middleware/authMiddleware';
import { CategoryService } from '@/services/categoryService';
import {AuthenticatedRequest} from "@/interfaces/auth.interface";

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        authenticate(req, res, async () => {

            const {status, data} = await CategoryService.getAllCategories();
            return res.status(status).json(data);
        });
    } catch (error: unknown) {
        console.error("Error fetching categories:", error);

        if (error instanceof Error) {
            return res.status(500).json({ error: `Internal Server Error: ${error.message}` });
        }

        return res.status(500).json({ error: "Internal Server Error" });
    }
}
