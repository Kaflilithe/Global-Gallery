import { Picture } from '../../../data/interfaces/gallery';
import { TuiSkeleton } from '@taiga-ui/kit';
import { Component, inject, input, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery-img',
  imports: [TuiSkeleton, NgOptimizedImage],
  templateUrl: './gallery-img.component.html',
  styleUrl: './gallery-img.component.css',
})
export class GalleryImgComponent {
  router = inject(Router);
  picture = input.required<Picture>();
  skeleton = signal(true);

  navigateToPhotoPage(id: number) {
    return this.router.navigate(['/image', id]);
  }
}
