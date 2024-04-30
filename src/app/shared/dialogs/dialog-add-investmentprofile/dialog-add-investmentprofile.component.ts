import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { sAuth } from '../../../services/sAuth.service';
import { User } from '../../../interfaces/iUser';

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
export class DialogAddInvestmentprofileComponent implements OnInit {
  public form: FormGroup = this.buildForm(); 
  public userData!: any;

  constructor(
    private sAuth: sAuth,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddInvestmentprofileComponent>
    ) {}

  ngOnInit(): void {
    this.sAuth.getUserData().subscribe({
      next: (userData) => {
        this.userData = userData,
        this.form = this.buildForm();
      },
      error: (error) => console.error(error)
    });
  }

  public buildForm() {
    console.log(this.userData)
    return this.fb.group({
      user_id: [this.userData?.id, [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      initial_capital: [null, [Validators.required]],
      duration: [null, [Validators.required]],
      monthly_contribution: [null, [Validators.required]]
    });
  }
  
  public submit() {
    this.dialogRef.close(this.form.value)
  }
}
