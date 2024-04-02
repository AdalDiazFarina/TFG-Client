import { AnimationBuilder, animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  animations: [
    trigger('menuInOut', [
      state('in', style({
        transform: 'translateX(-16rem)'
      })),
      state('out', style({
        transform: 'translateX(4rem)'
      })),
      transition('in => out', animate('400ms ease-out')),
      transition('out => in', animate('300ms ease-in'))
    ]),
    trigger('mainContent', [
      state('in', style({
        'margin-left': '0'
      })),
      state('out', style({
        'margin-left': '12rem'
      })),
      transition('in => out', animate('400ms ease-out')),
      transition('out => in', animate('300ms ease-in'))
    ])
  ]
})
export class HomePageComponent {
  public menuState = 'out';
  @ViewChild('menu', { static: true }) sideMenu?: ElementRef;

  constructor(
    private router: Router
  ) {}

  /**
   * Event that allow to display the side menu
   */
  public toggleMenu(): void {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  public onLogout(): void {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }
}
