import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  signal,
  viewChildren,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';
import { TuiPager } from '@taiga-ui/kit';
import { map, switchMap } from 'rxjs';
import { GalleryService } from '../../data/services/gallery.service';
import { ImgComponent } from '../../shared/ui/img/img.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
  imports: [TuiButton, TuiPager, ImgComponent, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
  galleryService = inject(GalleryService);
  activeRoute = inject(ActivatedRoute);
  router = inject(Router);

  imgQuery = viewChildren('img', {
    read: ElementRef,
  });

  page = signal(1);
  quantityPage = signal(10);
  quantityPictures = signal(5);
  pictures = rxResource({
    loader: () =>
      this.activeRoute.queryParams.pipe(
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

    effect(() => {
      this.imgQuery()[0]?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    });
  }

  updatePage(page: number) {
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: { page },
    });
  }
  navigateToPhotoPage(id: number) {
    return this.router.navigate(['/image', id]);
  }
  nextPage() {
    this.page.update((p) => (p <= this.quantityPage() ? p + 1 : p));
  }
  prevPage() {
    this.page.update((p) => (p > 1 ? p - 1 : p));
  }
}
