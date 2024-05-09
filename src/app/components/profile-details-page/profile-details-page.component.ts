import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-profile-details-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatMenuModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDividerModule
  ],
  templateUrl: './profile-details-page.component.html',
  styleUrl: './profile-details-page.component.scss'
})
export class ProfileDetailsPageComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'description', 'actions'];
  public dataSource: Strategy[] = [];
  public form: FormGroup = this.buildForm();
  public userData!: User;
  public id!: Number;

  constructor(
    private sTaskService: sTaskService,
    private fb: FormBuilder,
    private sStrategies: sStrategies,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.form = this.buildForm(Number(params.get('id')));
      this.getAllStrategies();
    });

    this.sTaskService.taskCompleted$.subscribe({
      next: (resp: any) => {
        console.log(resp);
      }, error: (error) => console.log(error)
    })
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
      Portfolio_concentration_ratio: null
    });
  }

  private transformData(data: any[]): Strategy[] {
    console.log('data', data)
    return data.map(({ strategy, other_data }) => ({
        "profile_id": other_data.profile_id,
        "strategy_id": other_data.strategy_id,
        "name": strategy.name,
        "description": strategy.description,
        "Total_profitability": other_data.total_profitability,
        "Volatility": other_data.volatility,
        "Maximum_loss": other_data.maximum_loss,
        "Sharpe": other_data.sharpe,
        "Sortino": other_data.sortino,
        "Alpha": other_data.alpha,
        "Beta": other_data.beta,
        "Information_ratio": other_data.information_ratio,
        "Success_rate": other_data.success_rate,
        "Portfolio_concentration_ratio": other_data.portfolio_concentration_ratio
    }));
}


  public getAllStrategies() {
    this.sStrategies.getList(this.form.value).subscribe({
      next: (res: any) => {
        this.dataSource = this.transformData(res.data);
      }, error: (error: Error) => console.error(error)
    })
  }

  onValidateStrategy(item: Strategy) {
    this.sTaskService.runTask()
  }
}
