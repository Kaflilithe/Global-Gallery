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

  getImages(per_page = 20, page = 1, q?: string) {
    return this.http.get<PictureDto>(
      `${this.baseApiUrl}?key=${this.key}&${q ? 'q=' + q : ''}&per_page=${per_page}&page=${page}&editors_choice=true`,
    );
  }
  getImage(id: number) {
    return this.http
      .get<PictureDto>(`${this.baseApiUrl}?key=${this.key}&id=${id}`)
      .pipe(
        map((e) => {
          return e.hits;
        }),
      );
  }
}
