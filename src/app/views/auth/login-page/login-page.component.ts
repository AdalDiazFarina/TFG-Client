import { Component } from '@angular/core';
import { SidePanelComponent } from '../../../shared/components/side-panel/side-panel.component';
import { Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup } from '@angular/forms';
import { sAuth } from '../../../services/sAuth';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    SidePanelComponent,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  public form: FormGroup = this.fb.group({
    nickname: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private sAuth: sAuth,
    private router: Router
  ) { }

  onSubmit() {
    this.sAuth.login(this.form.value).subscribe({
      next: (respond) => {
        console.log(respond)
        if (respond.code === 1) {
          localStorage.setItem('accessToken', respond.access_token);
          localStorage.setItem('refreshToken', respond.refresh_token);
          this.router.navigate(['/home']);
        } else {
          console.log(respond.message)
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
