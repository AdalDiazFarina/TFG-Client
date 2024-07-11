import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-upload-image',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './dialog-upload-image.component.html',
  styleUrl: './dialog-upload-image.component.scss'
})
export class DialogUploadImageComponent {
  public selectedImage: string = '';
  public default: string = '';
  public images: string[] = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9'
  ]

  constructor (
    public dialogRef: MatDialogRef<DialogUploadImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedImage = this.data.img;
    this.default = this.data.img;
  }

  public onSubmit(): void {
    this.dialogRef.close(this.selectedImage);
  }
}
