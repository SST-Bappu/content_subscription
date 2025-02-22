import {UserRepository} from "@/repositories/userRepository";
import {CategoryRepository} from "@/repositories/categoryRepository";
import {PaymentStrategyRegistry} from "@/strategies/paymentStrategies/paymentStrategyRegistry";
import {EmailStrategyRegister} from "@/strategies/emailStrategy/emailStrategyRegister";
import {EmailBuilderRegister} from "@/strategies/emailBuilderStrategy/emailBuilderRegister";
import {AuthService} from "@/services/authService";
import {EmailService} from "@/services/emailService";
import {SubscriptionService} from "@/services/subscriptionService";
import {PaymentService} from "@/services/paymentService";
import {SMTPEmail} from "@/strategies/emailStrategy/SMTPEmail";
import {StripePayment} from "@/strategies/paymentStrategies/stripePayment";
import {SubscriptionEmailBuilder, WelcomeEmailBuilder} from "@/strategies/emailBuilderStrategy/emailBuilder";
import {CategoryService} from "@/services/categoryService";
import {ContentRepository} from "@/repositories/contentRepository";
import {PrismaClient} from "@prisma/client";
// We keep a centralized container as the project size is small
// with limited services. We may upgrade to modularized containers for bigger projects


//clients
const prisma = new PrismaClient()

//repositories

const userRepository = new UserRepository(prisma)
const categoryRepository = new CategoryRepository(prisma)
const contentRepository = new ContentRepository(prisma)

//email strategies
const smtpStrategy = new SMTPEmail()

//payment strategies
const stripePaymentStrategy = new StripePayment()

//email builder strategies
const welcomeEmailBuilder = new WelcomeEmailBuilder()
const subscriptionEmailBuilder = new SubscriptionEmailBuilder()

//strategy registries
const paymentStrategyRegistry = new PaymentStrategyRegistry(stripePaymentStrategy)
const emailStrategyRegistry = new EmailStrategyRegister(smtpStrategy)
const emailBuilderRegistry = new EmailBuilderRegister(welcomeEmailBuilder, subscriptionEmailBuilder)

//services
const emailService = new EmailService(emailStrategyRegistry, emailBuilderRegistry)
const paymentService = new PaymentService(paymentStrategyRegistry)

//services in exports
const authService = new AuthService(userRepository, emailService)
const subscriptionService = new SubscriptionService(categoryRepository, userRepository, contentRepository, paymentService, emailService)
const categoryService = new CategoryService(categoryRepository)

export {authService, subscriptionService, categoryService}

