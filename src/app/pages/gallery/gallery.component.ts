import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  signal,
  viewChildren
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';
import { TuiPager } from '@taiga-ui/kit';
import { map, switchMap } from 'rxjs';
import { GalleryService } from '../../data/services/gallery.service';
import { ImgComponent } from '../../shared/ui/img/img.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GallerySearchComponent } from './gallery-search/gallery-search.component';
import { injectQuery } from '../../lib/inject-query';
import { GalleryQuerySchema } from './model/query.schema';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
  imports: [
    TuiButton,
    TuiPager,
    ImgComponent,
    FormsModule,
    ReactiveFormsModule,
    GallerySearchComponent,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
  galleryService = inject(GalleryService);
  activeRoute = inject(ActivatedRoute);

  imgQuery = viewChildren('img', {
    read: ElementRef,
  });

  query = injectQuery(GalleryQuerySchema);
  page = computed(() => this.query.value().page);
  q = computed(() => this.query.value().q);

  quantityPage = signal(10);
  quantityPictures = signal(5);

  pictures = rxResource({
    stream: () =>
      this.activeRoute.queryParams.pipe(
        switchMap(({ page, q }) => {
          return this.galleryService
            .getImages(this.quantityPictures(), page, q)
            .pipe(
              map((dto) => {
                this.quantityPage.update(() =>
                  Math.ceil(dto.totalHits / this.quantityPictures()),
                );
                return dto.hits;
              }),
            );
        }),
      ),
  });

  constructor() {
    effect(() => {
      this.imgQuery()[0]?.nativeElement.scrollIntoView();
    });
  }

  onSearch(value: string) {
    this.query.update({ page: 1, q: value });
  }

  nextPage() {
    this.query.update({ page: this.page() + 1 });
  }
  prevPage() {
    if (this.page() > 1) {
      this.query.update({ page: this.page() - 1 });
    }
  }
}
