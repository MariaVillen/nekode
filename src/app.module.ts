/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSourceConfig } from './config/data.source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ThemesModule } from './themes/themes.module';
import { StacksModule } from './stacks/stacks.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProgressThemesModule } from './progress-themes/progress-themes.module';
import { ProgressStacksModule } from './progress-stacks/progress-stacks.module';
import { AdminService } from './admin/admin.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron/cron.service';
import { MailerModule } from './mailer/mailer.module';
import { CronModule } from './cron/cron.module';
import { MailerService } from './mailer/mailer.service';
import { OAuthConfig } from './mailer/oauth.config';
import { FilesModule } from './files/files.module';

console.log(process.env.NODE_ENV);
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(DataSourceConfig),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    ThemesModule,
    StacksModule,
    MailerModule,
    CronModule,
    ProgressThemesModule,
    ProgressStacksModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AdminService,
    CronService,
    MailerService,
    OAuthConfig,
  ],
})
export class AppModule {
  constructor(
    private readonly adminService: AdminService,
    private readonly cronService: CronService,
  ) {}

  async onApplicationBootstrap() {
    try {
      await this.adminService.createAdminIfNotExists();
      await this.cronService.handleCron();
    } catch (error) {
      console.log(error);
    }
  }
}
