import { Component } from '@angular/core';
import { Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { DialogUploadImageComponent } from '../../shared/dialogs/dialog-upload-image/dialog-upload-image.component';
import { MatDialog } from '@angular/material/dialog';
import { sAuth } from '../../services/sAuth.service';
import { User } from '../../interfaces/iUser';
import { sNotification } from '../../services/sNotificatoin.service';
import { SharedService } from '../../services/sReload.service';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  public selectedImg: string = "1";
  private userData!: User;
  public form: FormGroup = this.buildForm(); 

  constructor(
    private fb: FormBuilder,
    private sAuth: sAuth,
    private dialog: MatDialog,
    private sNotification: sNotification,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  public getUser(): void {
    this.sAuth.getUser().subscribe({
      next: (res) => {
        this.userData = res.data,
        this.selectedImg = res.data.image
        this.form = this.buildForm();
      },
      error: (error) => console.error(error)
    });
  }

  public buildForm() {
    return this.fb.group({
      id: [this.userData ? this.userData.image : '1', []],
      name: [this.userData ? this.userData.name : '' , ],
      nickname: [this.userData ? this.userData.nickname : '', []],
      email: [this.userData ? this.userData.email : '', []],
      image: [this.userData ? this.userData.image : '', []]
    });
  }

  public onSaveUserData(): void {
    this.form.get('id')?.setValue(this.userData.id);
    this.sAuth.update(this.form.value).subscribe({
      next: (res) => {
        if (res.code === 1) {
          this.getUser();
          this.sharedService.triggerReload();
          this.sNotification.showNotification('The user profile is updated', 'Updated');
        }
      }, error: (error) => console.error(error)
    })
  }

  public onFileChanged(): void {
    alert("Image changed")
  }

  public onUpload(): void {
    alert("Image upload")
  }

  public onPopUpUploadImage(): void {
    let dialogRef = this.dialog.open(DialogUploadImageComponent, {
      data: {
        obj: null,
        img: this.selectedImg,
      },
      width: '1250px',
      height: '690px'
    });

    dialogRef.afterClosed().subscribe({
      next: (img) => {
        if (!img) return
        this.selectedImg = img;
        this.form.get('image')?.setValue(img);
      }, error: (error) => console.error(error)
    })
  }
}
