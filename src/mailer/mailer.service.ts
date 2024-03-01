import { Injectable } from '@nestjs/common';

import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { CreateMailerDto } from './dto/create-mailer.dto';
import Mail, { Address } from 'nodemailer/lib/mailer';
import { ErrorManager } from 'src/utils/error.manager';
import { RecoverPassMailerDto } from './dto/recover-pass-mailer.dto';
import { OAuthConfig } from './oauth.config';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly oauthConfig: OAuthConfig,
    private readonly configService: ConfigService,
  ) {
    this.transporter = this.createMailTransport();
  }

  public createMailTransport(): nodemailer.Transporter {
    const oauth2Client = this.oauthConfig.getOAuth2Client();

    return nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      secure: true,
      auth: {
        type: 'OAuth2',
        user: this.configService.get<string>('EMAIL_USER'),
        clientId: oauth2Client._clientId,
        clientSecret: oauth2Client._clientSecret,
        refreshToken: oauth2Client.credentials.refresh_token,
        accessToken: oauth2Client.credentials.access_token,
      },
    });
  }

  public createTemplate = (
    html: string,
    replacements: Record<string, string>,
  ) => {
    return html.replace(/%(\w*)/g, (match, key) => {
      return replacements.hasOwnProperty(key) ? replacements[key] : '';
    });
  };

  public async sendEmail(createMailerDto: CreateMailerDto) {
    const { from, bcc, subject, placeholderReplacement } = createMailerDto;
    const bccList = bcc.map(({ address }) => address).join(', ');

    const html = placeholderReplacement
      ? this.createTemplate(createMailerDto.html, placeholderReplacement)
      : createMailerDto.html;

    const options: Mail.Options = {
      from: from ?? {
        name: this.configService.get<string>('APP_NAME'),
        address: this.configService.get<string>('DEFAULT_MAIL_FROM'),
      },
      bcc: bccList,
      subject,
      html,
    };

    try {
      const result = await this.transporter.sendMail(options);
      return result;
    } catch (error) {
      console.log(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async sendMail(createMailerDto: CreateMailerDto) {
    return await this.sendEmail(createMailerDto);
  }

  async sendMailForRecoverPass(data: RecoverPassMailerDto) {
    const options: CreateMailerDto = {
      bcc: data.user,
      subject: 'Recupera tu contraseña',
      html: '<p>Hola <strong> %name% </strong>! <br/> <p>Puedes cambiar tu password siguiendo este link.<a href="%link%">%link%</a></p>',
      placeholderReplacement: { link: data.link },
    };
    return await this.sendEmail(options);
  }

  async sendMailForConfirmEmail(data: RecoverPassMailerDto) {
    const options: CreateMailerDto = {
      bcc: data.user,
      subject: 'Confirma tu email',
      html: '<p>Hola <strong> %name% </strong>! <br/> <p> Para poder acceder a tu cuenta necesitas verificar tu email. Sigue este link. <a href="%link%">%link%</a></p>',
      placeholderReplacement: { link: data.link },
    };
    return await this.sendEmail(options);
  }

  async sendMailNotificationChallenge(data: Address[]) {
    console.log(data);
    const options: CreateMailerDto = {
      bcc: data,
      subject: 'Te estamos esperando!',
      html: '<p>Hola <strong> %name% </strong>! <br/> <p>No dejes de aprender y evaluarte! Tienes nuevos desafíos esperándote en <a href="%link%">%link%</a></p>',
      placeholderReplacement: { link: 'link de origen' },
    };
    return await this.sendEmail(options);
  }
}
