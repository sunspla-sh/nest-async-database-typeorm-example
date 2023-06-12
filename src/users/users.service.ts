import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { CreateUserArrayDto } from './create-user-array.dto';
import { PhotosService } from 'src/photos/photos.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private dataSource: DataSource,
    private photosService: PhotosService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findAllWithPhotos(): Promise<User[]> {
    return this.usersRepository.find({
      relations: {
        photos: true,
      },
    });
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    return this.usersRepository.save(user);
  }

  async createMany(createUserArrayDto: CreateUserArrayDto): Promise<void> {
    const userArray: User[] = createUserArrayDto.action.map((dto) => {
      const u = new User();
      u.firstName = dto.firstName;
      u.lastName = dto.lastName;
      return u;
    });

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (let i = 0; i < userArray.length; i++) {
        await queryRunner.manager.save<User>(userArray[i]);
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async createWithPhotos(createUserDto: CreateUserDto): Promise<User> {
    const photo1 = await this.photosService.create('test' + Math.random());
    const photo2 = await this.photosService.create('test' + Math.random());

    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.photos = [photo1, photo2];
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
