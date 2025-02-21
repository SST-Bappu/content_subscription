import {EmailStrategy} from "@/strategies/interfaces/email.strategy";
import {SMTPEmail} from "@/strategies/emailStrategy/SMTPEmail";


const emailStrategies: Record<string, EmailStrategy> = {
    stripe: new SMTPEmail()
};

/**
 * Returns the appropriate email strategy.
 */
export function getEmailStrategy(): EmailStrategy {
    const method = process.env.EMAIL_PROVIDER || ''
    return emailStrategies[method.toLowerCase()] || new SMTPEmail(); // Default to SMTP
}
