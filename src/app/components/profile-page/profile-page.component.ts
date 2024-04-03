import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FlipCardComponent } from '../../shared/components/flip-card/flip-card.component';
import { sInvesmentProfile } from '../../services/sInvestmentProfiles.service';
import { InvestmentProfile } from '../../interfaces/iInvestmentProfile';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddInvestmentprofileComponent } from '../../shared/dialogs/dialog-add-investmentprofile/dialog-add-investmentprofile.component';
import { DialogUpdateInvestmentprofileComponent } from '../../shared/dialogs/dialog-update-investmentprofile/dialog-update-investmentprofile.component';
import { debounceTime, fromEvent } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';

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
    MatCheckboxModule,
    FlipCardComponent,
    MatMenuModule,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit, AfterViewInit {
  @ViewChildren('filter') filterInputs!: QueryList<ElementRef>;
  public form: FormGroup = this.fb.group({
    user_id: [1, []],
    name: ['', []],
    description: ['', []],
    initial_capital: [null, []],
    duration: [null, []],
    monthly_contribution: [null, []]
  });

  public profiles: InvestmentProfile[] = [];
  public allCheckboxSelected: boolean = false;
  public profilesSelected: number[] = [];

  constructor(
    private fb: FormBuilder,
    private sInvestmentProfile: sInvesmentProfile,
    private dialog: MatDialog
    ) {}

  ngAfterViewInit(): void {
    this.filterInputs.forEach(input => {
      fromEvent(input.nativeElement, 'input')
        .pipe(debounceTime(700))
        .subscribe(() => {
          this.getAllProfiles();
        });
    });
  }

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
      next: () => this.getAllProfiles(), 
      error: (error) => console.error(error)
    })
  }

  public onChangeSelectAll() {
    this.allCheckboxSelected = !this.allCheckboxSelected
    this.profilesSelected = this.profiles.map(profile => profile.id);
  }

  public deleteMultipleProfiles() {
    this.sInvestmentProfile.deleteMultiple(this.profilesSelected).subscribe({
      next: () => this.getAllProfiles(),
      error: (error) => console.error(error)
    })
  }
}
