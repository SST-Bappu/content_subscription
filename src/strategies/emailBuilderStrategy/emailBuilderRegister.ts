import {EmailBuilder} from "@/strategies/interfaces/emailBuilder.strategy";
import {
    SubscriptionEmailBuilder,
    WeeklyDigest,
    WelcomeEmailBuilder
} from "@/strategies/emailBuilderStrategy/emailBuilder";

export class EmailBuilderRegister {
    private emailBuilderStrategies: Record<string, EmailBuilder>;

    constructor(welcomeEmailBuilder: WelcomeEmailBuilder, subscriptionEmailBuilder: SubscriptionEmailBuilder, weeklyDigest: WeeklyDigest) {
        this.emailBuilderStrategies = {
            welcome: welcomeEmailBuilder,
            subscription: subscriptionEmailBuilder,
            digest: weeklyDigest
        };
    }

    /**
     * Returns the appropriate email builder strategy.
     */
    getEmailBuilderStrategy(emailType: string): EmailBuilder {
        return this.emailBuilderStrategies[emailType.toLowerCase()];
    }
}
