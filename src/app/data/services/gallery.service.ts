import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PictureDto } from '../interfaces/gallery';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  http: HttpClient = inject(HttpClient);
  baseApiUrl = 'https://pixabay.com/api/';
  key = '52781238-046b00268278ee34e5672f51a';

  getImages(per_page = 20, page = 1) {
    return this.http
      .get<PictureDto>(
        `${this.baseApiUrl}?key=${this.key}&per_page=${per_page}&page=${page}`
      )
      .pipe(map((dto) => dto.hits));
  }
}
