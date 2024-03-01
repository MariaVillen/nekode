import { Address } from 'nodemailer/lib/mailer';

export class CreateMailerDto {
  from?: Address;
  bcc: Address[];
  subject: string;
  html: string;
  text?: string;
  placeholderReplacement?: Record<string, string>;
}
