import {CategoryRepository} from '@/repositories/categoryRepository';
import {UserRepository} from '@/repositories/userRepository';
import {PaymentService} from '@/services/paymentService';
import {Decimal} from "@prisma/client/runtime/binary";

export class SubscriptionService {
    static async subscribe(userId: string, categoryId: string, paymentInfo: object, paymentMethod: string): Promise<{
        status: number;
        data: object
    }> {
        // Check if category exists
        const category = await CategoryRepository.getCategoryById(categoryId);
        if (!category) {
            return {status: 404, data: {error: "Category not found"}};
        }

        // Check if user is already subscribed
        const isAlreadySubscribed = await UserRepository.isUserSubscribedToCategory(userId, categoryId);
        if (isAlreadySubscribed) {
            return {status: 400, data: {error: "You are already subscribed to this category."}};
        }

        // Get the price of the category
        const amount = Decimal(category.price).toNumber();

        // Process the payment using the strategy pattern
        const paymentService = new PaymentService(paymentMethod);
        const paymentResult = await paymentService.pay(amount, paymentInfo);

        if (!paymentResult.success) {
            return {status: 400, data: {error: "Payment failed", details: paymentResult.error}};
        }

        // Subscribe the user to the category
        await UserRepository.subscribeUserToCategory(userId, categoryId);

        return {status: 200, data: {message: "Subscription successful", category: category.name}};
    }
}
