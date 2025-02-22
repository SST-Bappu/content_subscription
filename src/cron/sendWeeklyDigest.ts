import {UserRepository} from "@/repositories/userRepository";
import {ContentRepository} from "@/repositories/contentRepository";
import {EmailStrategyRegister} from "@/strategies/emailStrategy/emailStrategyRegister";
import {EmailBuilderRegister} from "@/strategies/emailBuilderStrategy/emailBuilderRegister";
import {EmailService} from "@/services/emailService";
import {SMTPEmail} from "@/strategies/emailStrategy/SMTPEmail";
import {PrismaClient} from "@prisma/client";
import {
    SubscriptionEmailBuilder,
    WeeklyDigest,
    WelcomeEmailBuilder
} from "@/strategies/emailBuilderStrategy/emailBuilder";
import {WeeklyDigestService} from "@/services/contentService";
import * as console from "node:console";

async function sendWeeklyDigestCron(){
    //client
    const prisma = new PrismaClient()

    //repositories
    const userRepo = new UserRepository(prisma)
    const contetnRepo = new ContentRepository(prisma)

    //email strategies
    const smtpStrategy = new SMTPEmail()

    //email builders
    const welcomeEmailBuilder = new WelcomeEmailBuilder()
    const subscriptionEmailBuilder = new SubscriptionEmailBuilder()
    const weeklyDigest = new WeeklyDigest()

    //registries
    const emailStrategyRegistry = new EmailStrategyRegister(smtpStrategy)
    const emailBuilderRegistry = new EmailBuilderRegister(welcomeEmailBuilder, subscriptionEmailBuilder, weeklyDigest)

    //services
    const emailService = new EmailService(emailStrategyRegistry, emailBuilderRegistry)
    const digestService = new WeeklyDigestService(userRepo, contetnRepo, emailService)


    console.log("Sending weekly digest to the users")
    await digestService.sendWeeklyDigest()
    console.log("Sending weekly digest completed")

}

sendWeeklyDigestCron()