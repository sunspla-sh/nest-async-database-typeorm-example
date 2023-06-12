import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PhotosModule } from 'src/photos/photos.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PhotosModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
