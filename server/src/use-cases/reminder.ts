import { Injectable } from '@nestjs/common';
import { CreateReminderDto } from 'src/controllers/reminder.controller';
import { ReminderRepository } from 'src/repositories/reminder-repository';

@Injectable()
export class ReminderUseCase {
  constructor(private reminderRepository: ReminderRepository) {}

  async createReminder({ title, date, userId, recurring }: CreateReminderDto) {
    return this.reminderRepository.createReminder({
      title,
      date,
      userId,
      recurring,
    });
  }

  async listReminders(userId: string) {
    return this.reminderRepository.listReminders(userId);
  }

  async addDeadbeat(email: string, reminderId: string) {
    return this.reminderRepository.addDeadbeat(email, reminderId);
  }

  async listDeadbeats(reminderId: string) {
    return this.reminderRepository.listDeadbeats(reminderId);
  }
}
