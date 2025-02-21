import {EmailMessage} from "@/interfaces/email.interface";

export interface EmailBuilder {
    buildMessage(data: object): EmailMessage;
}