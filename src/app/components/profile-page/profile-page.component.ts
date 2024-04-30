import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { FlipCardComponent } from '../../shared/components/flip-card/flip-card.component';
import { sInvesmentProfile } from '../../services/sInvestmentProfiles.service';
import { InvestmentProfile } from '../../interfaces/iInvestmentProfile';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddInvestmentprofileComponent } from '../../shared/dialogs/dialog-add-investmentprofile/dialog-add-investmentprofile.component';
import { DialogUpdateInvestmentprofileComponent } from '../../shared/dialogs/dialog-update-investmentprofile/dialog-update-investmentprofile.component';
import { debounceTime, fromEvent } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { User } from '../../interfaces/iUser';
import { sAuth } from '../../services/sAuth.service';
import { Router } from '@angular/router';

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
    MatDividerModule,
    MatTableModule
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit, AfterViewInit {
  @ViewChildren('filter') filterInputs!: QueryList<ElementRef>;
  public userData!: User;
  public form: FormGroup = this.buildForm();

  public displayedColumns: string[] = ['check', 'name', 'description', 'actions'];
  public profiles: InvestmentProfile[] = [];
  public allCheckboxSelected: boolean = false;
  public profilesSelected: number[] = [];

  constructor(
    private sAuth: sAuth,
    private fb: FormBuilder,
    private sInvestmentProfile: sInvesmentProfile,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sAuth.getUserData().subscribe({
      next: (userData) => {
        this.userData = userData,
        this.form = this.buildForm();
        this.getAllProfiles();
      },
      error: (error) => console.error(error)
    });
  }

  ngAfterViewInit(): void {
    this.filterInputs.forEach(input => {
      fromEvent(input.nativeElement, 'input')
        .pipe(debounceTime(700))
        .subscribe(() => {
          this.getAllProfiles();
        });
    });
  }


  public buildForm() {
    return this.fb.group({
      user_id: [this.userData?.id, []],
      name: ['', []],
      description: ['', []],
      initial_capital: [null, []],
      duration: [null, []],
      monthly_contribution: [null, []]
    });
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
        if (!res) return 
        this.sInvestmentProfile.create(res).subscribe({
          next: (res) => {
            if (res.code === 1) this.getAllProfiles();
          }, error: (error) => console.error(error)
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
          }, error: (error) => console.error(error)
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

  public profileDetails(id: number) {
    this.router.navigate(['/home/details', id]);     
  }
}
