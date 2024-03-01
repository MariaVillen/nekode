import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';

@Injectable()
export class OAuthConfig {
  private readonly oauth2Client: any;

  constructor(private readonly configService: ConfigService) {
    this.oauth2Client = new google.auth.OAuth2(
      this.configService.get<string>('EMAIL_OAUTH_CLIENT_ID'),
      this.configService.get<string>('EMAIL_OAUTH_PRIVATE_KEY'),
      this.configService.get<string>('EMAIL_REDIRECT_URI'),
    );
    this.oauth2Client.setCredentials({
      refresh_token: this.configService.get<string>('EMAIL_REFRESH_TOKEN'),
    });
  }

  getOAuth2Client(): any {
    try {
      const myauth = this.oauth2Client;
      console.log(myauth);
      return this.oauth2Client;
    } catch (err) {
      console.log(err);
      throw Error(err);
    }
  }
}
