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

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [ReminderController, AuthController],
  providers: [
    ReminderUseCase,
    ReminderRepository,
    AuthUseCase,
    AuthRepository,
    JwtAuthGuard,
  ],
})
export class AppModule {}
