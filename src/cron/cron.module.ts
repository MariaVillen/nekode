import { Module } from '@nestjs/common';
import { CronService } from 'src/cron/cron.service';
import { MailerModule } from 'src/mailer/mailer.module';
import { MailerService } from 'src/mailer/mailer.service';
import { OAuthConfig } from 'src/mailer/oauth.config';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [MailerModule, UsersModule],
  providers: [CronService, MailerService, UsersService, OAuthConfig],
})
export class CronModule {}
