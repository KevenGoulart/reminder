import { Injectable } from '@nestjs/common';
import { CreateReminderDto } from 'src/controllers/reminder.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReminderRepository {
  constructor(private prisma: PrismaService) {}

  async createReminder({
    title,
    date,
    userId,
    relatedUsers,
  }: CreateReminderDto) {
    await this.prisma.reminder.create({
      data: {
        title,
        date,
        userId,
        relatedUsers: {
          connect: relatedUsers.map((id) => ({ id })),
        },
      },
    });
  }
}
