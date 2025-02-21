import {NextApiRequest, NextApiResponse} from 'next';
import {LoginRequestBody, LoginSchema} from "@/dtos/auth.dtos";
import {formatZodErrors} from "@/utils/zod.error.validator";
import {authService} from "@/services/containers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({error: "Method not allowed"});
    }

    try {
        // Validate Request Body Using `zod`
        const validation = LoginSchema.safeParse(req.body)
        if (!validation.success) {
            return res.status(400).json({error: formatZodErrors(validation.error)});
        }

        //Extract Validated data
        const credentials: LoginRequestBody = validation.data

        const {status, data} = await authService.login(credentials);
        return res.status(status).json(data);
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({error: "Internal Server Error"});
    }
}
