import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import {verifyJWT} from "@/utils/jwt";


export function authenticate(handler: NextApiHandler) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];

            if (!token) {
                throw { status: 401, message: "Unauthorized: No token provided" };
            }

            const decoded = verifyJWT(token);
            if (!decoded) {
                throw { status: 403, message: "Forbidden: Invalid token" };
            }

            // Attach user info to request (optional)
            (req as any).user = decoded;

            return handler(req, res);
        } catch (error) {
            console.error("Authentication Error:", error);
            throw error;
        }
    };
}
