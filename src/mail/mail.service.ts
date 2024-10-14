import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  // Method to send email verification
  async sendUserConfirmation(email: string, token: string) {
    const appUrl = process.env.APP_URL;
    const url = `${appUrl}/auth/verify-email?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Our App! Confirm your Email',
      template: './confirmation',
      context: {
        name: email,
        url,
      },
    });
  }
}
