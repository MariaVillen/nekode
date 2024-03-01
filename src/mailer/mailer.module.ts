import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { OAuthConfig } from './oauth.config';

@Module({
  providers: [MailerService, OAuthConfig],
})
export class MailerModule {}
