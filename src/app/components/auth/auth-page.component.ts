import { Component } from '@angular/core';
import { SidePanelComponent } from '../../shared/components/side-panel/side-panel.component';
import { Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup } from '@angular/forms';
import { sAuth } from '../../services/sAuth.service';
import { Router, RouterModule } from '@angular/router';
import { trigger, transition, style, state, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [
    SidePanelComponent,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterModule,
    CommonModule
  ],
  animations: [
    trigger('slideAnimation', [
      state('in', style({
        transform: 'translateX(0%)'
      })),
      state('out', style({
        transform: 'translateX(100%)'
      })),
      transition('in => out', animate('300ms ease-out')),
      transition('out => in', animate('300ms ease-in'))
    ]),
    trigger('flipAnimation', [
      state('front', style({ transform: 'none'})),
      state('back', style({ transform: 'rotateY(180deg)'})),
      transition('front => back', animate('0.5s')),
      transition('back => front', animate('0.5s'))
    ])
  ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent {
  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(15)]],
    nickname: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  public slideAnimationState = 'in';
  public flipAnimationState = 'front';
  public isMobile = window.innerWidth < 768;

  constructor (
    private fb: FormBuilder,
    private sAuth: sAuth,
    private router: Router
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = window.innerWidth < 768;
  }

  onLogin() {
    this.form.get('name')?.setValue('');
    this.form.get('email')?.setValue('');
    this.sAuth.login(this.form.value).subscribe({
      next: (res) => {
        if (res.code === 1) {
          localStorage.setItem('accessToken', res.access_token);
          localStorage.setItem('refreshToken', res.refresh_token);
          this.router.navigate(['/home']);
        } else {
          console.error(res.message)
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onRegister() {
    this.sAuth.register(this.form.value).subscribe({
      next: () => {
        this.slideAnimationState = 'in';
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  toogleFormAnimation() {
    if (this.isMobile) {
      this.toogleFlipAnimation(); 
    } else {
      this.toggleSlideAnimation();
    }
  }

  toggleSlideAnimation() {
    this.slideAnimationState = this.slideAnimationState === 'in' ? 'out' : 'in';
  }

  toogleFlipAnimation() {
    this.flipAnimationState = this.flipAnimationState === 'front' ? 'back' : 'front';
  }
}
