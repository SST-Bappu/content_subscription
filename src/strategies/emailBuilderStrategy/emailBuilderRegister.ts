import {EmailBuilder} from "@/strategies/interfaces/emailBuilder.strategy";
import {SubscriptionEmailBuilder, WelcomeEmailBuilder} from "@/strategies/emailBuilderStrategy/emailBuilder";

export class EmailBuilderRegister {
    private emailBuilderStrategies: Record<string, EmailBuilder>;

    constructor(welcomeEmailBuilder: WelcomeEmailBuilder, subscriptionEmailBuilder: SubscriptionEmailBuilder) {
        this.emailBuilderStrategies = {
            welcome: welcomeEmailBuilder,
            subscription: subscriptionEmailBuilder
        };
    }

    /**
     * Returns the appropriate email builder strategy.
     */
    getEmailBuilderStrategy(emailType: string): EmailBuilder {
        return this.emailBuilderStrategies[emailType.toLowerCase()]; // Default to SMTP
    }
}
