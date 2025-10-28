import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { GalleryService } from '../../data/services/gallery.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { TuiAvatar } from '@taiga-ui/kit';
import { ImgComponent } from '../../shared/ui/img/img.component';
import { TuiIconPipe } from '@taiga-ui/core';
import { ConvertArrayPipe } from '../../helpers/pipes/convert-array.pipe';
import { TagComponent } from '../../shared/ui/tag/tag.component';

@Component({
  selector: 'app-photo-pages',
  imports: [
    TuiAvatar,
    ImgComponent,
    TuiIconPipe,
    ConvertArrayPipe,
    TagComponent,
    RouterLink,
  ],
  templateUrl: './photo-page.component.html',
  styleUrl: './photo-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoPagesComponent {
  profileService = inject(GalleryService);
  route = inject(ActivatedRoute);
  image = rxResource({
    stream: () =>
      this.route.params.pipe(
        switchMap(({ id }) => {
          return this.profileService.getImage(id);
        }),
      ),
  });
}
