import {EmailStrategyRegister} from "@/strategies/emailStrategy/emailStrategyRegister";
import {EmailBuilderRegister} from "@/strategies/emailBuilderStrategy/emailBuilderRegister";


export class EmailService {

    constructor(
        private emailStrategyRegistry: EmailStrategyRegister,
        private emailBuilderRegistry: EmailBuilderRegister) {
    }


    /**
     * Send email using the selected email provider.
     */
    async sendEmail(data: object, emailType: string): Promise<void> {
        const builderStrategy = this.emailBuilderRegistry.getEmailBuilderStrategy(emailType)
        const emailData = builderStrategy.buildMessage(data)
        return await this.emailStrategyRegistry.getEmailStrategy().sendEmail(emailData.to, emailData.subject, emailData.body);
    }
}
