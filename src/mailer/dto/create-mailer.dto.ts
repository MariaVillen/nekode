import { Address } from 'nodemailer/lib/mailer';

export class CreateMailerDto {
  from?: Address;
  recipients: Address[];
  subject: string;
  html: string;
  text?: string;
  placeholderReplacement?: Record<string, string>;
}
