import {PaymentStrategyRegistry} from "@/strategies/paymentStrategies/paymentStrategyRegistry";

export class PaymentService {

    constructor(private paymentStrategyRegister: PaymentStrategyRegistry) {
    }


    /**
     * Processes payment using the selected payment gateway.
     */
    async pay(amount: number, paymentInfo: object, paymentGateway: string): Promise<{
        success: boolean;
        error?: string
    }> {
        return await this.paymentStrategyRegister.getPaymentStrategy(paymentGateway).pay(amount, paymentInfo);
    }
}
