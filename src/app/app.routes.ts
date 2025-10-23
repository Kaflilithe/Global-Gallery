import { Routes } from '@angular/router';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { PhotoPagesComponent } from './pages/photo-page/photo-page.component';

export const routes: Routes = [
  {
    path: 'gallery',
    component: GalleryComponent,
  },
  { path: 'image/:id', component: PhotoPagesComponent },
];
