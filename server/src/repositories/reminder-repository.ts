import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateReminderDto } from 'src/controllers/reminder.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReminderRepository {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('reminder') private ReminderQueue: Queue,
  ) {}

  async createReminder({ title, date, userId, recurring }: CreateReminderDto) {
    const reminder = await this.prisma.reminder.create({
      data: {
        title,
        date,
        userId,
        recurring,
      },
    });

    const delay = new Date(date).getTime() - Date.now();

    await this.ReminderQueue.add(
      'send',
      { reminderId: reminder.id },
      { delay },
    );

    return reminder;
  }

  async listReminders(userId: string) {
    return this.prisma.reminder.findMany({
      where: {
        userId,
      },
    });
  }

  async addDeadbeat(email: string, reminderId: string) {
    return this.prisma.reminder.update({
      where: { id: reminderId },
      data: {
        relatedUsers: {
          push: email,
        },
      },
    });
  }

  async listDeadbeats(reminderId: string) {
    return this.prisma.reminder.findUnique({
      where: { id: reminderId },
      select: {
        relatedUsers: true,
      },
    });
  }
}
