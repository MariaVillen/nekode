import { Injectable } from '@nestjs/common';

import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { CreateMailerDto } from './dto/create-mailer.dto';
import Mail from 'nodemailer/lib/mailer';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {}

  public mailTransport = () => {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      secure: true,
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    });
    return transporter;
  };

  public createTemplate = (
    html: string,
    replacements: Record<string, string>,
  ) => {
    return html.replace(/%(\w*)/g, (match, key) => {
      return replacements.hasOwnProperty(key) ? replacements[key] : '';
    });
  };

  public async sendEmail(createMailerDto: CreateMailerDto) {
    const { from, recipients, subject, placeholderReplacement } =
      createMailerDto;
    const html = placeholderReplacement
      ? this.createTemplate(createMailerDto.html, placeholderReplacement)
      : createMailerDto.html;
    const transporter = this.mailTransport();

    const options: Mail.Options = {
      from: from ?? {
        name: this.configService.get<string>('APP_NAME'),
        address: this.configService.get<string>('DEFAULT_MAIL_FROM'),
      },
      to: recipients,
      subject,
      html,
    };

    try {
      const result = await transporter.sendMail(options);
      return result;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
