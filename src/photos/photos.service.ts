import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo) private photosRepository: Repository<Photo>,
  ) {}

  create(photoName: string): Promise<Photo> {
    const photo = new Photo();
    photo.name = photoName;
    return this.photosRepository.save(photo);
  }

  findAll(): Promise<Photo[]> {
    return this.photosRepository.find();
  }
}
