/**
 * Defines the payload required for subscribing to a category.
 */
export interface SubscriptionRequestBody {
    categoryId: string;
    paymentInfo: { payment_method: string };
    paymentMethod: string;
}