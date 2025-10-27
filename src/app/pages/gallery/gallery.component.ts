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
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';
import { TuiPager } from '@taiga-ui/kit';
import { map, switchMap } from 'rxjs';
import { GalleryService } from '../../data/services/gallery.service';
import { ImgComponent } from '../../shared/ui/img/img.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GallerySearchComponent } from './gallery-search/gallery-search.component';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
  galleryService = inject(GalleryService);
  activeRoute = inject(ActivatedRoute);
  router = inject(Router);

  imgQuery = viewChildren('img', {
    read: ElementRef,
  });

  queryParams = toSignal(this.activeRoute.queryParams);
  page = computed(() =>
    this.queryParams()?.['page'] ? Number(this.queryParams()?.['page']) : 1,
  );
  q = computed(() => this.queryParams()?.['q']?.toString());

  quantityPage = signal(10);
  quantityPictures = signal(5);

  pictures = rxResource({
    loader: () =>
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
    console.log('value', value);
    this.updatePage({ page: 1, q: value });
  }

  updatePage(value: Partial<{ page: number; q: string }> = {}) {
    const search = this.activeRoute.snapshot.queryParams;
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: { ...search, ...value },
    });
  }

  navigateToPhotoPage(id: number) {
    return this.router.navigate(['/image', id]);
  }
  nextPage() {
    this.updatePage({ page: this.page() + 1 });
  }
  prevPage() {
    if (this.page() > 1) {
      this.updatePage({ page: this.page() - 1 });
    }
  }
}
