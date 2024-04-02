import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-update-investmentprofile',
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
  templateUrl: './dialog-update-investmentprofile.component.html',
  styleUrl: './dialog-update-investmentprofile.component.scss'
})
export class DialogUpdateInvestmentprofileComponent{
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogUpdateInvestmentprofileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.form = this.buildForm();
    }

  public buildForm() {
    return this.fb.group({
      id: [this.data.id],
      user_id: [this.data.user_id],
      name: [this.data.name],
      description: [this.data.description],
      initial_capital: [this.data.initial_capital],
      duration: [this.data.duration],
      monthly_contribution: [this.data.monthly_contribution]
    });
  }

    public submit() {
      this.dialogRef.close()
    }
}
