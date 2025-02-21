import {PaymentGatewayStrategy} from "@/strategies/interfaces/paymentGateway.strategy";
import {getPaymentStrategy} from "@/strategies/paymentStrategies/paymentStrategyRegistry";

export class PaymentService {
    private paymentGateway: PaymentGatewayStrategy;

    constructor(paymentMethod: string) {
        this.paymentGateway = getPaymentStrategy(paymentMethod);
    }


    /**
     * Processes payment using the selected payment gateway.
     */
    async pay(amount: number, paymentInfo: object): Promise<{ success: boolean; error?: string }> {
        return await this.paymentGateway.pay(amount, paymentInfo);
    }
}
