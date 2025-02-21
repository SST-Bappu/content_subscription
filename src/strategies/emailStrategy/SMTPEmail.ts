import * as nodemailer from 'nodemailer';
import {EmailStrategy} from "@/strategies/interfaces/email.strategy";


export class SMTPEmail implements EmailStrategy {
    private transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    async sendEmail(to: string, subject: string, message: string): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_FROM_EMAIL,
                to,
                subject,
                text: message,
            });
            console.log(`Email sent to ${to}`);
        } catch (error) {
            console.error("SMTP Email Error:", error);
        }

    }
}
