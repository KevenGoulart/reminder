import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/services/mail.service';

@Processor('reminder')
export class ReminderProcessor {
  constructor(
    @InjectQueue('reminder') private reminderQueue: Queue,
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  @Process('send')
  async handleSend(job: Job<{ reminderId: string }>) {
    const { reminderId } = job.data;

    const reminder = await this.prisma.reminder.findUnique({
      where: { id: reminderId },
    });

    if (!reminder || reminder.relatedUsers.length === 0) return;

    for (const email of reminder.relatedUsers) {
      await this.mailService.sendReminderEmail(email, reminder.title);
    }

    if (reminder.recurring) {
      const nextDate = new Date(reminder.date);
      nextDate.setMonth(nextDate.getMonth() + 1);
      const delay = nextDate.getTime() - Date.now();

      await this.reminderQueue.add('send', { reminderId }, { delay });
    }
  }
}
