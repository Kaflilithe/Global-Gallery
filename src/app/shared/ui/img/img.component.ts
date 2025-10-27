import { Picture } from '../../../data/interfaces/gallery';
import { TuiSkeleton } from '@taiga-ui/kit';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-img',
  imports: [TuiSkeleton],
  templateUrl: './img.component.html',
  styleUrl: './img.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImgComponent {
  picture = input.required<Picture>();
  skeleton = signal(true);
}
