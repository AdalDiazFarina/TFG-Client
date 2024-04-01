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
  selector: 'app-register-page',
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
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(15)]],
    nickname: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private sAuth: sAuth,
    private router: Router
    ) {}

  onSubmit() {
    this.sAuth.register(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
