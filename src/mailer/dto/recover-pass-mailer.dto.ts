import { Address } from 'nodemailer/lib/mailer';

export class RecoverPassMailerDto {
  user: Address[];
  link: string;
}
