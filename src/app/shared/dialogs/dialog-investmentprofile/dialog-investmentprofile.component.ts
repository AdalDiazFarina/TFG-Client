import { Component } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogUploadImageComponent } from '../dialog-upload-image/dialog-upload-image.component';

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
    MatCardModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './dialog-investmentprofile.component.html',
  styleUrl: './dialog-investmentprofile.component.scss'
})
export class DialogInvestmentprofileComponent {
  public form: FormGroup;
  public selectedImg: string = '1'

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogInvestmentprofileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
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

    public onPopUpUploadImage(): void {
      let dialogRef = this.dialog.open(DialogUploadImageComponent, {
        data: {
          obj: null,
          img: this.selectedImg
        },
        width: '1250px',
        height: '690px'
      });
  
      dialogRef.afterClosed().subscribe({
        next: (img) => {
          this.selectedImg = img;
        }, error: (error) => console.error(error)
      });
    }
}
