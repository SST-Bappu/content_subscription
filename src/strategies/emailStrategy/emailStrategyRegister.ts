import {EmailStrategy} from "@/strategies/interfaces/email.strategy";
import {SMTPEmail} from "@/strategies/emailStrategy/SMTPEmail";

export class EmailStrategyRegister {
    private emailStrategies: Record<string, EmailStrategy>

    constructor() {
        this.emailStrategies = {
            stripe: new SMTPEmail()
        };
    }

    /**
     * Returns the appropriate email strategy.
     */
    getEmailStrategy(): EmailStrategy {
        const method = process.env.EMAIL_PROVIDER || 'smtp' // Default to SMTP
        return this.emailStrategies[method.toLowerCase()];
    }
}


