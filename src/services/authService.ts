import { UserRepository } from '@/repositories/userRepository';
import { hashPassword, comparePassword } from '@/utils/bcrypt';
import { generateJWT } from '@/utils/jwt';
import { RegisterUserInput, LoginUserInput, AuthResponse } from '@/interfaces/auth.interface';

export class AuthService {
    static async register(userData: RegisterUserInput): Promise<AuthResponse> {
        const { name, email, password } = userData;

        const existingUser = await UserRepository.getUserByEmail(email);
        if (existingUser) {
            return { status: 409, data: { error: "User already exists" } };
        }

        const hashedPassword = await hashPassword(password);
        const newUser = await UserRepository.createUser({ name, email, password: hashedPassword });

        const token = generateJWT({ userId: newUser.id });

        return { status: 201, data: { message: "User registered successfully", token } };
    }

    static async login(credentials: LoginUserInput): Promise<AuthResponse> {
        const { email, password } = credentials;

        const user = await UserRepository.getUserByEmail(email);
        if (!user) {
            return { status: 401, data: { error: "Invalid credentials" } };
        }

        const isValidPassword = await comparePassword(password, user.password);
        if (!isValidPassword) {
            return { status: 401, data: { error: "Invalid credentials" } };
        }

        const token = generateJWT({ userId: user.id });

        return { status: 200, data: { token } };
    }
}
