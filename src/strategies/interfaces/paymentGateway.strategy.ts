export interface PaymentGatewayStrategy {
    pay(amount: number, paymentInfo: object): Promise<{ success: boolean; error?: string }>;
}