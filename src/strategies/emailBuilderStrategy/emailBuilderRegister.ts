import {EmailBuilder} from "@/strategies/interfaces/emailBuilder.strategy";
import {SubscriptionEmailBuilder, WelcomeEmailBuilder} from "@/strategies/emailBuilderStrategy/emailBuilder";

export class EmailBuilderRegister {
    private emailBuilderStrategies: Record<string, EmailBuilder>;

    constructor() {
        this.emailBuilderStrategies = {
            welcome: new WelcomeEmailBuilder(),
            subscription: new SubscriptionEmailBuilder()
        };
    }

    /**
     * Returns the appropriate email builder strategy.
     */
    getEmailBuilderStrategy(emailType: string): EmailBuilder {
        return this.emailBuilderStrategies[emailType.toLowerCase()]; // Default to SMTP
    }
}
