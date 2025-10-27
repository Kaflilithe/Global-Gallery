import { Routes } from '@angular/router';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { PhotoPagesComponent } from './pages/photo-page/photo-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'gallery',
  },
  {
    path: 'gallery',
    children: [
      { path: '', component: GalleryComponent },
      { path: ':id', component: PhotoPagesComponent },
    ],
  },
];
