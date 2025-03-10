import {NextApiRequest} from "next";

export interface RegisterUserInput {
    name: string;
    email: string;
    password: string;
}

export interface LoginUserInput {
    email: string;
    password: string;
}

export interface AuthResponse {
    status: number;
    data: object;
}


export interface AuthenticatedRequest extends NextApiRequest{
    user?: {userId: string}
}