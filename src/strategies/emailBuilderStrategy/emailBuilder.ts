import {EmailBuilder} from "@/strategies/interfaces/emailBuilder.strategy";
import {EmailMessage} from "@/interfaces/email.interface";
import * as console from "node:console";


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

export class WeeklyDigest implements EmailBuilder {
    buildMessage(data: { name: string; email: string; contents: { title: string }[] }): EmailMessage {
        const message_body = data.contents.map(content => `-${content.title}`).join('\n')
        return {
            to: data.email,
            subject: `Weekly Digest`,
            body: `Hi ${data.name}, find your latest weekly digest.\n`+message_body
        }
    }
}