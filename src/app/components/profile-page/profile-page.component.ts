import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FlipCardComponent } from '../../shared/components/flip-card/flip-card.component';
import { sInvesmentProfile } from '../../services/sInvestmentProfiles';
import { InvestmentProfile } from '../../interfaces/iInvestmentProfile';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddInvestmentprofileComponent } from '../../shared/dialogs/dialog-add-investmentprofile/dialog-add-investmentprofile.component';
import { DialogUpdateInvestmentprofileComponent } from '../../shared/dialogs/dialog-update-investmentprofile/dialog-update-investmentprofile.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FlipCardComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    user_id: [1, []],
    name: ['', []],
    description: ['', []],
    initial_capital: [null, []],
    duration: [null, []],
    monthly_contribution: [null, []]
  });

  public profiles: InvestmentProfile[] = [];

  constructor(
    private fb: FormBuilder,
    private sInvestmentProfile: sInvesmentProfile,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.getAllProfiles();
  }

  public getAllProfiles() {
    this.sInvestmentProfile.getList(this.form.value).subscribe({
      next: (res) => {
        this.profiles = res.data;
      },
      error: (error) => console.error(error)
    })
  }

  public addProfile() {
    let dialogRef = this.dialog.open(DialogAddInvestmentprofileComponent, {
      width: '400px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.sInvestmentProfile.create(res).subscribe({
          next: (res) => {
            if (res.code === 1) this.getAllProfiles();
          }, error: (error) => console.log(error)
        })
      }, error: (error) => console.error(error)
    })
  }

  public editProfile(profile: InvestmentProfile) {
    let dialogRef = this.dialog.open(DialogUpdateInvestmentprofileComponent, {
      data: profile,
      width: '400px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.sInvestmentProfile.update(res).subscribe({
          next: (res) => {
            if (res.code === 1) this.getAllProfiles();
          }, error: (error) => console.log(error)
        })
      }, error: (error) => console.error(error)
    })
  }

  public deleteProfile(id: number) {
    this.sInvestmentProfile.delete(id).subscribe({
      next: (res) => {
        console.log(res)
        this.getAllProfiles();
      }, error: (error) => console.error(error)
    })
  }



}
