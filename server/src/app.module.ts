import { Module } from '@nestjs/common';
import { ReminderController } from './controllers/reminder.controller';
import { ReminderUseCase } from './use-cases/reminder';
import { ReminderRepository } from './repositories/reminder-repository';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt.guard';
import { AuthController } from './controllers/auth.controller';
import { AuthUseCase } from './use-cases/auth';
import { AuthRepository } from './repositories/auth-repository';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './services/mail.service';
import { BullModule } from '@nestjs/bull';
import { ReminderProcessor } from './processors/reminder.processor';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    BullModule.registerQueue({ name: 'reminder' }),
  ],
  controllers: [ReminderController, AuthController],
  providers: [
    ReminderUseCase,
    ReminderRepository,
    AuthUseCase,
    AuthRepository,
    JwtAuthGuard,
    ReminderProcessor,
    MailService,
  ],
})
export class AppModule {}
