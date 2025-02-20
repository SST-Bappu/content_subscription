import { NextApiRequest, NextApiResponse } from 'next';
import { AuthService } from '@/services/authService';
import { LoginUserInput } from '@/interfaces/auth.interface';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const credentials: LoginUserInput = req.body;
        const { status, data } = await AuthService.login(credentials);
        return res.status(status).json(data);
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
