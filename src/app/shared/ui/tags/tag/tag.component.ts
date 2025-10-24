import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TuiChip } from '@taiga-ui/kit';

@Component({
  selector: 'app-tag',
  imports: [TuiChip],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent {
  tag = input.required<string>();
}
