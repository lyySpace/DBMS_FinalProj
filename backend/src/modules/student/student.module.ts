import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { ProfileModule } from './profile/profile.module';
import { ApplicationModule } from './application/application.module';
import { AchievementModule } from './achievement/achievement.module';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
  imports: [ProfileModule, ApplicationModule, AchievementModule]
})
export class StudentModule {}
