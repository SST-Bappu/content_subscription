import {EmailBuilder} from "@/strategies/interfaces/emailBuilder.strategy";
import {EmailMessage} from "@/interfaces/email.interface";


export class WelcomeEmailBuilder implements EmailBuilder {
    buildMessage(data: { name: string; email: string }): EmailMessage {
        return {
            to: data.email,
            subject: `Welcome, ${data.name}!`,
            body: `Hi ${data.name}, welcome to our platform!`,
        };
    }
}


export class SubscriptionEmailBuilder implements EmailBuilder {
    buildMessage(data: { name: string; email: string; category: string }): EmailMessage {
        return {
            to: data.email,
            subject: `Subscription Confirmation`,
            body: `Hi ${data.name}, You have successfully subscribed to the category ${data.category} for weekly digest!`,
        };
    }
}