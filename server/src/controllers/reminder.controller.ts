import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { IsBoolean, IsDate, IsString } from 'class-validator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { ReminderUseCase } from 'src/use-cases/reminder';

export class CreateReminderDto {
  @IsString()
  title!: string;

  @IsDate()
  date!: Date;

  @IsBoolean()
  recurring?: boolean;

  @IsString()
  userId!: string;

  @IsString({ each: true })
  relatedUsers!: string[];
}

@UseGuards(JwtAuthGuard)
@Controller('reminder')
export class ReminderController {
  constructor(private readonly reminderUseCase: ReminderUseCase) {}

  @Post('create')
  createReminder(
    @Body() { title, date, userId, relatedUsers, recurring }: CreateReminderDto,
  ) {
    return this.reminderUseCase.createReminder({
      title,
      date,
      userId,
      recurring,
      relatedUsers,
    });
  }
}
