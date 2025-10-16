import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
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
  page = 1;
  pictures = rxResource({
    loader: () =>
      this.activRoute.queryParams.pipe(
        switchMap(({ page }) => {
          if (page) {
            this.page = page;
          }
          return this.galleryService.getImages(52, page);
        })
      ),
  });
  nextPage() {
    this.page++;
    this.router.navigate([], {
      relativeTo: this.activRoute,
      queryParams: { page: this.page },
    });
  }
  prevPage() {
    this.page--;
    this.router.navigate([], {
      relativeTo: this.activRoute,
      queryParams: { page: this.page },
    });
  }
}
