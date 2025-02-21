import { NextApiResponse } from 'next';
import { verifyJWT } from '@/utils/jwt';
import {AuthenticatedRequest} from "@/interfaces/auth.interface";



/**
 * Middleware to protect API routes.
 */
export function authenticate(req: AuthenticatedRequest, res: NextApiResponse, next: () => void): void {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"
        if (!token) {
            res.status(401).json({ error: "Unauthorized: No token provided" });
            return;
        }

        const decoded = verifyJWT(token);
        if (!decoded || typeof decoded === "string" || !decoded.userId) {
            res.status(401).json({ error: "Unauthorized: Invalid token" });
            return;
        }

        req.user = { userId: decoded.userId }; // ✅ Attach user ID to request
        next(); // ✅ Proceed to the next function
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(401).json({ error: `Unauthorized: ${error.message}` });
        }
        return res.status(401).json({ error: "Unauthorized: Invalid authentication" });
    }
}
