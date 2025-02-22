import { UserRepository } from '@/repositories/userRepository';
import { hashPassword, comparePassword } from '@/utils/bcrypt';
import { generateJWT } from '@/utils/jwt';
import { RegisterUserInput, LoginUserInput, AuthResponse } from '@/interfaces/auth.interface';
import {EmailService} from "@/services/emailService";


export class AuthService {
    constructor(
        private userRepo: UserRepository,
        private emailService: EmailService
    ) {}
    async register(userData: RegisterUserInput): Promise<AuthResponse> {
        const { name, email, password } = userData;

        const existingUser = await this.userRepo.getUserByEmail(email);
        if (existingUser) {
            throw { status: 409, data: { error: "User already exists" } };
        }

        const hashedPassword = await hashPassword(password);
        const newUser = await this.userRepo.createUser({ name, email, password: hashedPassword });

        const token = generateJWT({ userId: newUser.id });

        // Send welcome email to the user

        const emailData = {
            email: newUser!.email,
            name: newUser!.name,
        }
        await this.emailService.sendEmail(emailData, 'welcome')


        return { status: 201, data: { message: "User registered successfully", token } };
    }

    async login(credentials: LoginUserInput): Promise<AuthResponse> {
        const { email, password } = credentials;

        const user = await this.userRepo.getUserByEmail(email);
        if (!user) {
            throw { status: 401, message: "Invalid credentials" };
        }

        const isValidPassword = await comparePassword(password, user.password);
        if (!isValidPassword) {
            throw { status: 401, message: "Invalid credentials" };
        }

        const token = generateJWT({ userId: user.id });

        return { status: 200, data: { token } };
    }
}
