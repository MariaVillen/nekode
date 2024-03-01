import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MailerService } from 'src/mailer/mailer.service';
import { UsersService } from 'src/users/users.service';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class CronService {
  constructor(
    @Inject(UsersService)
    private usersService: UsersService,
    @Inject(MailerService)
    private readonly mailerService: MailerService,
  ) {}

  @Cron('45 15 * * *')
  async handleCron() {
    console.log('ejecutando cron envio correos');
    await this.sendNotifications();
  }

  private async sendNotifications() {
    try {
      const usersDailyNotification =
        await this.usersService.getUsersWithNotificationsDaily();
      const usersWithNotificationSeven =
        await this.usersService.getUsersWithNotificationsWeekly();
      const recipients = [
        ...usersDailyNotification,
        ...usersWithNotificationSeven,
      ];
      await this.mailerService.sendMailNotificationChallenge(recipients);
      if (usersWithNotificationSeven.length === 0) return;
      await this.usersService.updateLastNotificationDate(
        usersWithNotificationSeven,
      );
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
