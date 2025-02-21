import {PaymentGatewayStrategy} from "@/strategies/interfaces/paymentGateway.strategy";
import {StripePayment} from "@/strategies/paymentStrategies/stripePayment";

export class PaymentStrategyRegistry {
    private paymentStrategies: Record<string, PaymentGatewayStrategy>;

    constructor() {
        this.paymentStrategies = {
            stripe: new StripePayment(),
            // paypal: new PayPalPayment(),
        };
    }

    /**
     * Returns the appropriate payment strategy.
     * @param method - The payment method (e.g., "stripe", "paypal").
     */
    getPaymentStrategy(method: string): PaymentGatewayStrategy {
        const defaultPayment = process.env.DEFAULT_PAYMENT_GATEWAY as string
        return this.paymentStrategies[method.toLowerCase()] || this.paymentStrategies[defaultPayment]; // Default to Stripe
    }
}

