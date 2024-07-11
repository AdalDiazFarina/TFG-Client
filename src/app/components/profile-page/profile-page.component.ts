import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { FlipCardComponent } from '../../shared/components/flip-card/flip-card.component';
import { sInvesmentProfile } from '../../services/sInvestmentProfiles.service';
import { InvestmentProfile } from '../../interfaces/iInvestmentProfile';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, fromEvent } from 'rxjs';
import { sAuth } from '../../services/sAuth.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { DialogInvestmentprofileComponent } from '../../shared/dialogs/dialog-investmentprofile/dialog-investmentprofile.component';
import { sNotification } from '../../services/sNotificatoin.service';

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
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule
  ],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(300%)'
      })),
      state('out', style({
        transform: 'translateX(400%)',
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('resize', [
      state('in', style({
        width: 'calc(100% - 25%)'
      })),
      state('out', style({
        width: '100%'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('filters', [
      state('in', style({
        transform: 'translateX(300%)'
      })),
      state('out', style({
        transform: 'translateX(400%)',
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('resize', [
      state('in', style({
        width: 'calc(100% - 25%)'
      })),
      state('out', style({
        width: '100%'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit, AfterViewInit {
  public slideInOut: string  = 'out';
  public filters: string = 'out';
  public resize: string = 'out';
  @ViewChildren('filter') filterInputs!: QueryList<ElementRef>;
  public userData!: any;
  public form: FormGroup = this.buildForm();
  public currentProfile?: InvestmentProfile;

  public total: number = 0;
  public pageIndex: number = 0;
  public pageSize: number = 5;

  public displayedColumns: string[] = ['check', 'profile', 'actions'];
  public profiles: InvestmentProfile[] = [];
  public profilesTable: InvestmentProfile[] = [];
  public allCheckboxSelected: boolean = false;
  public profilesSelected: number[] = [];

  constructor(
    private sAuth: sAuth,
    private fb: FormBuilder,
    private sInvestmentProfile: sInvesmentProfile,
    private dialog: MatDialog,
    private router: Router,
    private sNotification: sNotification
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
      monthly_contribution: [null, []],
      image: ['', []]
    });
  }

  public getAllProfiles() {
    this.sInvestmentProfile.getList(this.form.value).subscribe({
      next: (res) => {
        this.profiles = res.data;
        this.total = this.profiles.length;
        this.profilesTable = this.profiles.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize)
      },
      error: (error) => console.error(error)
    })
  }

  public addProfile() {
    let dialogRef = this.dialog.open(DialogInvestmentprofileComponent, {
      data: {
        obj: null,
        title: "Add a new Investment Profile",
        mode: 0
      },
      width: '800px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (!res) return
        res.user_id = this.userData.id;
        this.sInvestmentProfile.create(res).subscribe({
          next: (res) => {
            if (res.code === 1) {
              this.getAllProfiles();
              this.sNotification.showNotification('The profile is created', 'Created');
            }
          }, error: (error) => console.error(error)
        })
      }, error: (error) => console.error(error)
    })
  }

  public editProfile(profile: InvestmentProfile, index: number) {
    let dialogRef = this.dialog.open(DialogInvestmentprofileComponent, {
      data: {
        obj: profile,
        title: "Investment Profile",
        mode: 1
      },
      width: '800px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (!res) return;
        this.sInvestmentProfile.update(res).subscribe({
          next: (res) => {
            if (res.code === 1) {
              this.getAllProfiles();
              this.sNotification.showNotification('The profile is updated', 'Updated');
            }
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
    if (this.allCheckboxSelected) {
      this.profilesSelected = []
      this.profilesSelected = this.profiles.map(profile => profile.id);
    } else {
      this.profilesSelected = []
    }
  }

  public onSelect(id: number) {
    if (!this.profilesSelected.includes(id)) {
      this.profilesSelected.push(id)
    } else {
      this.profilesSelected = this.profilesSelected.filter(x => x !== id)
    }
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

  public toogleSlideOut() {
    this.slideInOut = 'out';
    this.resize = 'out';
  }

  public toogleSlideIn(profile: InvestmentProfile) {
    this.slideInOut = 'in';
    this.filters = 'out';
    this.resize = 'in';
    this.currentProfile = profile;
  }

  public toogleFilters() {
    this.filters = this.filters === 'in' ? 'out' : 'in';
    this.slideInOut = this.filters === 'in' ? 'out' : this.slideInOut;
    this.resize = this.filters === 'in' ? 'in' : 'out';
  }

  onPaginateChange(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    let end: number = this.profiles.length < (this.pageIndex * this.pageSize) + this.pageSize ? this.profiles.length : (this.pageIndex * this.pageSize) + this.pageSize
    this.profilesTable = this.profiles.slice(this.pageIndex * this.pageSize, end)
  }
}
