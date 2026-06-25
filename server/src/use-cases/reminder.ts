import { Injectable } from '@nestjs/common';
import { CreateReminderDto } from 'src/controllers/reminder.controller';
import { ReminderRepository } from 'src/repositories/reminder-repository';

@Injectable()
export class ReminderUseCase {
  constructor(private reminderRepository: ReminderRepository) {}

  async createReminder({
    title,
    date,
    userId,
    relatedUsers,
  }: CreateReminderDto) {
    return this.reminderRepository.createReminder({
      title,
      date,
      userId,
      relatedUsers,
    });
  }
}
