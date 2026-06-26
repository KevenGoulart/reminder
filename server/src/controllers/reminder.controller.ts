import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { IsBoolean, IsDate, IsString } from 'class-validator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { ReminderUseCase } from 'src/use-cases/reminder';
import { Type } from 'class-transformer';

export class CreateReminderDto {
  @IsString()
  title!: string;

  @Type(() => Date)
  @IsDate()
  date!: Date;

  userId!: string;

  @IsBoolean()
  recurring!: boolean;
}

@UseGuards(JwtAuthGuard)
@Controller('reminder')
export class ReminderController {
  constructor(private readonly reminderUseCase: ReminderUseCase) {}

  @Post('create')
  createReminder(
    @Body() { title, date, recurring }: CreateReminderDto,
    @CurrentUser() user: { sub: string },
  ) {
    return this.reminderUseCase.createReminder({
      title,
      date,
      userId: user.sub,
      recurring,
    });
  }

  @Get('list')
  listReminders(@CurrentUser() user: { sub: string }) {
    return this.reminderUseCase.listReminders(user.sub);
  }
}
