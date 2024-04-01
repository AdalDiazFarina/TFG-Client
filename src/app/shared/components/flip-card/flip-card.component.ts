import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-flip-card',
  standalone: true,
  imports: [
    MatCardModule,
  ],
  templateUrl: './flip-card.component.html',
  styleUrl: './flip-card.component.scss'
})
export class FlipCardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
}
