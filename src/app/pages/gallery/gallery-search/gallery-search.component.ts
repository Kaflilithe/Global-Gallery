import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
} from '@angular/core';
import { TuiLabel, TuiTextfield, TuiTextfieldComponent } from '@taiga-ui/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-gallery-search',
  imports: [TuiTextfieldComponent, TuiLabel, TuiTextfield, ReactiveFormsModule],
  templateUrl: './gallery-search.component.html',
  styleUrl: './gallery-search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GallerySearchComponent {
  value = input<string>();
  onChange = output<string>();

  ctrl = new FormControl();

  constructor() {
    effect(() => {
      this.ctrl.setValue(this.value(), { emitEvent: false });
    });

    this.ctrl.valueChanges
      .pipe(debounceTime(400), takeUntilDestroyed())
      .subscribe((value) => {
        this.onChange.emit(value);
      });
  }
}
