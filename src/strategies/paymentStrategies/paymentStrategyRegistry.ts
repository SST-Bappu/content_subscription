import {PaymentGatewayStrategy} from "@/strategies/interfaces/paymentGateway.strategy";
import {StripePayment} from "@/strategies/paymentStrategies/stripePayment";


const paymentStrategies: Record<string, PaymentGatewayStrategy> = {
    stripe: new StripePayment(),
    // paypal: new PayPalPayment(),
};

/**
 * Returns the appropriate payment strategy.
 * @param method - The payment method (e.g., "stripe", "paypal").
 */
export function getPaymentStrategy(method: string): PaymentGatewayStrategy {
    return paymentStrategies[method.toLowerCase()] || new StripePayment(); // Default to Stripe
}
