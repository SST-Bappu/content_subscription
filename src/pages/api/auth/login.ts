import {NextApiRequest, NextApiResponse} from 'next';
import {LoginRequestBody, LoginSchema} from "@/dtos/auth.dtos";
import {formatZodErrors} from "@/utils/zod.error.validator";
import {authService} from "@/services/containers";
import {errorHandler} from "@/middleware/errorHandlingMiddleware";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        throw {status: 405, message: "Method not allowed"};
    }


    const validation = LoginSchema.safeParse(req.body)
    if (!validation.success) {
        throw {status:400, message: formatZodErrors(validation.error)};
    }

    //Extract Validated data
    const credentials: LoginRequestBody = validation.data

    const {status, data} = await authService.login(credentials);
    return res.status(status).json({success: true, data: data});
}

export default errorHandler(handler)