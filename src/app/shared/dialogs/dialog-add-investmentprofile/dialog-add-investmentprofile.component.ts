import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-add-investmentprofile',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule
  ],
  templateUrl: './dialog-add-investmentprofile.component.html',
  styleUrl: './dialog-add-investmentprofile.component.scss'
})
export class DialogAddInvestmentprofileComponent {
  public form: FormGroup = this.fb.group({
    user_id: [1, [Validators.required]],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    initial_capital: [null, [Validators.required]],
    duration: [null, [Validators.required]],
    monthly_contribution: [null, [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddInvestmentprofileComponent>
    ) {}

  public submit() {
    this.dialogRef.close(this.form.value)
  }
}
