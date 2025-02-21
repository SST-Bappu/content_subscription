import Stripe from 'stripe';
import {PaymentGatewayStrategy} from "@/strategies/interfaces/paymentGateway.strategy";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export class StripePayment implements PaymentGatewayStrategy {
    async pay(amount: number, paymentInfo: {payment_method: string, [key: string]: string}): Promise<{ success: boolean; response?:object; error?: string }> {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(amount * 100), // Convert to cents
                currency: 'usd',
                automatic_payment_methods: {
                    enabled: true,
                },
                payment_method: paymentInfo.payment_method,
                confirm: true,
            });

            return { success: true, response: paymentIntent };
        } catch (error: unknown) {
            if (error instanceof Stripe.errors.StripeError) { // ✅ Check if it's a StripeError
                return { success: false, error: error.message };
            }
            return { success: false, error: "An unexpected error occurred" };
        }
    }
}
