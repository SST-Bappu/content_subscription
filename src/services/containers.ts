import {UserRepository} from "@/repositories/userRepository";
import {CategoryRepository} from "@/repositories/categoryRepository";
import {PaymentStrategyRegistry} from "@/strategies/paymentStrategies/paymentStrategyRegistry";
import {EmailStrategyRegister} from "@/strategies/emailStrategy/emailStrategyRegister";
import {EmailBuilderRegister} from "@/strategies/emailBuilderStrategy/emailBuilderRegister";
import {AuthService} from "@/services/authService";
import {EmailService} from "@/services/emailService";
import {SubscriptionService} from "@/services/subscriptionService";
import {PaymentService} from "@/services/paymentService";
// We keep a centralized container as the project size is small
// with limited services. We may upgrade to modularized containers for bigger projects


//repositories

const userRepository = new UserRepository()
const categoryRepository = new CategoryRepository()

//strategies
const paymentStrategyRegistry = new PaymentStrategyRegistry()
const emailStrategyRegistry = new EmailStrategyRegister()
const emailBuilderRegistry = new EmailBuilderRegister()

//services
const emailService = new EmailService(emailStrategyRegistry, emailBuilderRegistry)
const paymentService = new PaymentService(paymentStrategyRegistry)

//services in exports
const authService = new AuthService(userRepository, emailService)
const subscriptionService = new SubscriptionService(categoryRepository, userRepository, paymentService, emailService)


export {authService, subscriptionService}

