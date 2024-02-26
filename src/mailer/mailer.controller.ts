import { Controller } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { RecoverPassMailerDto } from './dto/recover-pass-mailer.dto';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(createMailerDto: CreateMailerDto) {
    return await this.mailerService.sendEmail(createMailerDto);
  }

  async sendMailForRecoverPass(data: RecoverPassMailerDto) {
    const options: CreateMailerDto = {
      recipients: data.user,
      subject: 'Recupera tu contraseña',
      html: '<p>Hi <strong> %name% </strong>: <br/> <p>You can follow this link to reset your password <a href="%link%">%link%</a></p>',
      placeholderReplacement: { link: data.link },
    };
    return await this.mailerService.sendEmail(options);
  }
}
