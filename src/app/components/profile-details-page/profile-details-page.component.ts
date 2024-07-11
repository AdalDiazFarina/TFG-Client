import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Strategy } from '../../interfaces/iStrategy';
import { User } from '../../interfaces/iUser';
import { sStrategies } from '../../services/sStrategies.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { sTaskService } from '../../services/sTaskService.service';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { DialogProfileDetailsComponent } from '../../shared/dialogs/dialog-profile-details/dialog-profile-details.component';
import { sInvesmentProfile } from '../../services/sInvestmentProfiles.service';
import { InvestmentProfile } from '../../interfaces/iInvestmentProfile';
import { debounceTime, fromEvent } from 'rxjs';

@Component({
  selector: 'app-profile-details-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatMenuModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDividerModule
  ],
  templateUrl: './profile-details-page.component.html',
  styleUrl: './profile-details-page.component.scss'
})
export class ProfileDetailsPageComponent implements OnInit {
  @ViewChildren('filter') filterInputs!: QueryList<ElementRef>;
  public displayedColumns: string[] = ['name', 'description', 'loader', 'actions'];
  public dataSource: Strategy[] = [];
  public form: FormGroup = this.buildForm();
  public userData!: User;
  public id!: Number;
  private loadingItems: Set<Strategy> = new Set<Strategy>();
  private profile!: InvestmentProfile;

  constructor(
    private sTaskService: sTaskService,
    private fb: FormBuilder,
    private sStrategies: sStrategies,
    private sProfile: sInvesmentProfile,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.form = this.buildForm(Number(params.get('id')));
      this.getAllStrategies();
    });

    this.sProfile.get(this.id).subscribe({
      next: res => this.profile = res.data,
      error: error => console.error(error)
    })

    this.sTaskService.taskCompleted$.subscribe({
      next: (resp: any) => {
        for (let item of this.loadingItems) {
          if (item.strategy_id === resp.strategy_id && item.profile_id === resp.profile_id) {
            this.loadingItems.delete(item);
          }
        }
        console.log('sTaskService: ', resp)
        this.getAllStrategies();
      },
      error: (error) => console.error('Error en la respuesta del servidor:', error)
    });
  }

  ngAfterViewInit(): void {
    this.filterInputs.forEach(input => {
      fromEvent(input.nativeElement, 'input')
        .pipe(debounceTime(700))
        .subscribe(() => {
          this.getAllStrategies();
        });
    });
  }

  public buildForm(id?: number) {
    return this.fb.group({
      profile_id: id,
      strategy_id: null,
      name: '',
      description: '',
      Total_profitability: null,
      Volatility: null,
      Maximum_loss: null,
      Sharpe: null,
      Sortino: null,
      Alpha: null,
      Beta: null,
      Information_ratio: null,
      Success_rate: null,
      Portfolio_concentration_ratio: null,
      annual_return: null,
    });
  }

  private transformData(data: any[]): Strategy[] {
    return data.map(({ strategy, profile_strategy }) => ({
        "profile_id": profile_strategy.investment_profile_id,
        "strategy_id": profile_strategy.strategy_id,
        "validated": profile_strategy.validated,
        "name": strategy.name,
        "description": strategy.description,
        "Total_profitability": profile_strategy.total_profitability,
        "Volatility": profile_strategy.volatility,
        "Maximum_loss": profile_strategy.maximum_loss,
        "Sharpe": profile_strategy.sharpe,
        "Sortino": profile_strategy.sortino,
        "Alpha": profile_strategy.alpha,
        "Beta": profile_strategy.beta,
        "Information_ratio": profile_strategy.information_ratio,
        "Success_rate": profile_strategy.success_rate,
        "Portfolio_concentration_ratio": profile_strategy.portfolio_concentration_ratio,
        "annual_return": profile_strategy.annual_return 
    }));
}



  public getAllStrategies() {
    console.log('form: ', this.form.value)
    this.sStrategies.getList(this.form.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.dataSource = this.transformData(res.data);
      }, error: (error: Error) => console.error(error)
    })
  }

  onValidateStrategy(item: Strategy) {
    this.loadingItems.add(item);
    this.sTaskService.runTask({
      "profile_id": item.profile_id,
      "strategy_id": item.strategy_id,
      "name": item.name,
      "duration": this.profile.duration
    })
  }

  isLoading(item: Strategy) {
    const isLoading = this.loadingItems.has(item);
    return isLoading;
  }

  openDialog(strategy: Strategy): void {
    const dialogRef = this.dialog.open(DialogProfileDetailsComponent, {
      data: {
        title: strategy.name,
        obj: strategy,
        profile: this.profile
      },
      width: '800px',
      height: '700px'
    });
  }


}
