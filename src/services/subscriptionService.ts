import {CategoryRepository} from '@/repositories/categoryRepository';
import {UserRepository} from '@/repositories/userRepository';
import {PaymentService} from '@/services/paymentService';
import {Decimal} from "@prisma/client/runtime/binary";
import {EmailService} from "@/services/emailService";
import {Category} from "@prisma/client";
import {ContentRepository} from "@/repositories/contentRepository";
import {string} from "zod";

export class SubscriptionService {
    constructor(
        private categoryRepo: CategoryRepository,
        private userRepo: UserRepository,
        private contentRepo: ContentRepository,
        private paymentService: PaymentService,
        private emailService: EmailService
    ) {
    }

    async subscribe(userId: string, categoryId: string, paymentInfo: object, paymentGateway: string): Promise<{
        status: number;
        data: object
    }> {
        // Check if category exists
        const category = await this.categoryRepo.getCategoryById(categoryId);
        if (!category) {
            return {status: 404, data: {error: "Category not found"}};
        }

        // Check if user is already subscribed
        const isAlreadySubscribed = await this.userRepo.isUserSubscribedToCategory(userId, categoryId);
        if (isAlreadySubscribed) {
            return {status: 400, data: {error: "You are already subscribed to this category."}};
        }

        // Get the price of the category
        const amount = Decimal(category.price).toNumber();

        // Process the payment using the strategy pattern
        const paymentResult = await this.paymentService.pay(amount, paymentInfo, paymentGateway);

        if (!paymentResult.success) {
            return {status: 400, data: {error: "Payment failed", details: paymentResult.error}};
        }

        // Subscribe the user to the category
        await this.userRepo.subscribeUserToCategory(userId, categoryId);

        // Send subscription email to the user
        const user = await this.userRepo.getUserById(userId)

        const emailData = {
            email: user!.email,
            name: user!.name,
            category: category.name
        }
        await this.emailService.sendEmail(emailData, 'subscription')

        return {status: 200, data: {message: "Subscription successful", category: category.name}};
    }

    async getSubscribedContent(userId: string): Promise<{ status: number; data: object[] | object }> {
        const user = await this.userRepo.getUserByIdWithCategories(userId)

        //check if user exists
        if (!user) {
            return {status: 404, data: {error: "User not found"}};
        }

        // map category ids
        const categoryIds: string[] = user.categories.map((category: Category) => category.id as string);
        //fetch contents by category
        const contents = await this.contentRepo.getContentsByCategories(categoryIds)

        return {status: 200, data: contents}
    }
}
