import {NextApiRequest, NextApiResponse} from 'next';
import {RegisterRequestBody, RegisterSchema} from "@/dtos/auth.dtos";
import {formatZodErrors} from "@/utils/zod.error.validator";
import {authService} from "@/services/containers";
import {errorHandler} from "@/middleware/errorHandlingMiddleware";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        throw {status: 405, message: "Method not allowed"}
    }

    // Validate Request Body Using `zod`
    const validation = RegisterSchema.safeParse(req.body)
    if (!validation.success) {
        throw {status:400, message: formatZodErrors(validation.error)};
    }
    // Extract Validated Data
    const userData: RegisterRequestBody = validation.data
    const {status, data} = await authService.register(userData);
    return res.status(status).json({success: true, data: data});

}
export default errorHandler(handler)
