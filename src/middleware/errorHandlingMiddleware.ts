import { NextApiRequest, NextApiResponse } from "next";

export const errorHandler = (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<any>) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            await handler(req, res);
        } catch (error: any) {
            console.error("Error Caught:", error);

            // If error is an instance of Error, use error.message; otherwise, fallback to structured errors
            const statusCode = error.status || 500;
            const errorMessage = error.message || (error.data?.error ?? "Internal Server Error");

            res.status(statusCode).json({ success: false, error: errorMessage });
        }
    };
};
