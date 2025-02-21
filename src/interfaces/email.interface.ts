export interface EmailMessage {
    to: string;
    subject: string;
    body: string;
    cc?: string[];
    bcc?: string[];
    attachments?: Array<{ filename: string; content: Buffer | string }>;
}