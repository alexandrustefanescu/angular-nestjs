import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-tech-stack',
  templateUrl: './tech-stack.component.html',
  imports: [MatExpansionModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TechStackComponent {
  readonly panelOpenState = signal(false);
}
