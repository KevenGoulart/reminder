import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend = new Resend(process.env.RESEND_API_KEY);

  async sendReminderEmail(to: string, reminderTitle: string) {
    await this.resend.emails.send({
      from: 'kevengoulartmm@gmail.com',
      to,
      subject: `Lembrete: ${reminderTitle}`,
      html: `<p>Você tem um lembrete hoje: <strong>${reminderTitle}</strong></p>`,
    });
  }
}
