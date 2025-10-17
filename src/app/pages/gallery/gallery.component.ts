import {
  ChangeDetectionStrategy,
  Component,
  effect,
  Inject,
  inject,
  signal,
} from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { GalleryService } from '../../data/services/gallery.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
  galleryService = inject(GalleryService);
  activRoute = inject(ActivatedRoute);
  router = inject(Router);
  page = signal(1);
  pictures = rxResource({
    loader: () =>
      this.activRoute.queryParams.pipe(
        switchMap(({ page }) => {
          if (page) {
            this.page.set(Number(page));
          }

          return this.galleryService.getImages(5, page);
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
    this.page.update((p) => p + 1);
  }
  prevPage() {
    this.page.update((p) => p - 1);
  }
}
