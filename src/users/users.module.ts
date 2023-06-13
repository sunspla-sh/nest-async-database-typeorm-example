import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSubscriber } from './user.subscriber';
import { PhotosModule } from 'src/photos/photos.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PhotosModule],
  providers: [UsersService, UserSubscriber],
  controllers: [UsersController],
})
export class UsersModule {}
