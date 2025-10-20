import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';
import { TuiPager } from '@taiga-ui/kit';
import { map, switchMap } from 'rxjs';
import { GalleryService } from '../../data/services/gallery.service';
import { GalleryImgComponent } from "./gallery-img/gallery-img.component";

@Component({
  selector: 'app-gallery',  
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
  imports: [TuiButton, TuiPager, GalleryImgComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
  galleryService = inject(GalleryService);
  activRoute = inject(ActivatedRoute);
  router = inject(Router);
  page = signal(1);
  quantityPage = signal(10);
  quantityPictures = signal(5);
  pictures = rxResource({
    loader: () =>
      this.activRoute.queryParams.pipe(
        switchMap(({ page }) => {
          if (page) {
            this.page.set(Number(page));
          }
          return this.galleryService
            .getImages(this.quantityPictures(), page)
            .pipe(
              map((dto) => {
                this.quantityPage.update(() =>
                  Math.ceil(dto.totalHits / this.quantityPictures()),
                );
                console.log(Math.ceil(dto.totalHits / page));

                return dto.hits;
              }),
            );
        }),
      ),
  });
  constructor() {
    effect(() => {
      this.updatePage(this.page());
    });
  }

  updatePage(page: number) {
    this.router.navigate([], {
      relativeTo: this.activRoute,
      queryParams: { page },
    });
  }

  nextPage() {
    this.page.update((p) => (p <= this.quantityPage() ? p + 1 : p));
  }
  prevPage() {
    this.page.update((p) => (p > 1 ? p - 1 : p));
  }
}
