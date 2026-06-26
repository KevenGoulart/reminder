import { Injectable } from '@nestjs/common';
import { CreateReminderDto } from 'src/controllers/reminder.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReminderRepository {
  constructor(private prisma: PrismaService) {}

  async createReminder({ title, date, userId, recurring }: CreateReminderDto) {
    await this.prisma.reminder.create({
      data: {
        title,
        date,
        userId,
        recurring,
      },
    });
  }

  async listReminders(userId: string) {
    return this.prisma.reminder.findMany({
      where: {
        userId,
      },
    });
  }
}
