import jwt, {JwtPayload, Secret, SignOptions} from 'jsonwebtoken';

const SECRET: Secret = process.env.JWT_SECRET as string;

export function generateJWT(payload: object, expiresIn: string = '1h'): string {
    return jwt.sign(payload, SECRET, {expiresIn} as SignOptions);
}

export function verifyJWT(token: string): JwtPayload | string | null {
    try {
        return jwt.verify(token, SECRET);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return null;
    }
}
