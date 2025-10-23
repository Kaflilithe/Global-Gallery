import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { GalleryService } from '../../data/services/gallery.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { TuiAvatar } from '@taiga-ui/kit';
import { ImgComponent } from '../../shared/ui/img/img.component';

@Component({
  selector: 'app-photo-pages',
  imports: [TuiAvatar, ImgComponent],
  templateUrl: './photo-page.component.html',
  styleUrl: './photo-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoPagesComponent {
  profileService = inject(GalleryService);
  route = inject(ActivatedRoute);
  image = rxResource({
    loader: () =>
      this.route.params.pipe(
        switchMap(({ id }) => {
          return this.profileService.getImage(id);
        }),
      ),
  });
}
