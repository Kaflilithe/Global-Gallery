import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TagComponent } from './tag/tag.component';

@Component({
  selector: 'app-tags',
  imports: [TagComponent],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsComponent {
  tags = input.required<string[] | null>();
}
