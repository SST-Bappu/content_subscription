export interface EmailStrategy {
    sendEmail(to: string, subject: string, message: string): Promise<void>;
}
