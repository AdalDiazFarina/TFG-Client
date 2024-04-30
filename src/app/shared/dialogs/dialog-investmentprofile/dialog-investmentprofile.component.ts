import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './dialog-investmentprofile.component.html',
  styleUrl: './dialog-investmentprofile.component.scss'
})
export class DialogInvestmentprofileComponent{
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogInvestmentprofileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.form = this.buildForm();
    }

  public buildForm() {
    return this.fb.group({
      id: [this.data.obj === null ? '' : this.data.obj.id],
      user_id: [this.data.obj === null ? '' : this.data.obj.user_id],
      name: [this.data.obj === null ? '' : this.data.obj.name],
      description: [this.data.obj === null ? '' : this.data.obj.description],
      initial_capital: [this.data.obj === null ? '' : this.data.obj.initial_capital],
      duration: [this.data.obj === null ? '' : this.data.obj.duration],
      monthly_contribution: [this.data.obj === null ? '' : this.data.obj.monthly_contribution]
    });
  }

    public submit() {
      this.dialogRef.close(this.form.value)
    }
}
