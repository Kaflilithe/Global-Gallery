import { Component, input, signal } from '@angular/core';
import { Picture } from '../../../data/interfaces/gallery';
import { TuiSkeleton } from '@taiga-ui/kit';

@Component({
  selector: 'app-gallery-img',
  imports: [TuiSkeleton],
  templateUrl: './gallery-img.component.html',
  styleUrl: './gallery-img.component.css',
})
export class GalleryImgComponent {
  picture = input.required<Picture>();
  skeleton = signal(true);
}
