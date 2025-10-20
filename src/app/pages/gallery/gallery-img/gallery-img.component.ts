import { Component, input, signal } from '@angular/core';
import { Picture } from '../../../data/interfaces/gallery';
import { TuiShimmer, TuiSkeleton } from '@taiga-ui/kit';
import { TuiIcon } from "@taiga-ui/core";

@Component({
  selector: 'app-gallery-img',
  imports: [TuiSkeleton, TuiShimmer, TuiIcon],
  templateUrl: './gallery-img.component.html',
  styleUrl: './gallery-img.component.css',
})
export class GalleryImgComponent {
  picture = input.required<Picture>();
  skeleton = signal(true);
}
