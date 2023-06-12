import { Controller, Get } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { Photo } from './photo.entity';

@Controller('photos')
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @Get()
  findAll(): Promise<Photo[]> {
    return this.photosService.findAll();
  }
}
