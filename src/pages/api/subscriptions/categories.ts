import {NextApiResponse} from 'next';
import {AuthenticatedRequest} from "@/interfaces/auth.interface";
import {categoryService} from "@/services/containers";
import {errorHandler} from "@/middleware/errorHandlingMiddleware";
import {authenticate} from "@/middleware/authMiddleware";

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        throw {status: 405, message: "Method not allowed"};
    }


    const {status, data} = await categoryService.getAllCategories();
    return res.status(status).json({success: true, data: data});

}

export default errorHandler(authenticate(handler))