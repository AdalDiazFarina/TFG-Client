import { Component, OnInit } from '@angular/core';
import { Strategy } from '../../interfaces/iStrategy';
import { User } from '../../interfaces/iUser';
import { sStrategies } from '../../services/sStrategies.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import { sTaskService } from '../../services/sTaskService.service';

@Component({
  selector: 'app-profile-details-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
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

  public getAllStrategies() {
    this.sStrategies.getList(this.form.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.dataSource = res.data;
      }, error: (error: Error) => console.error(error)
    })
  }

  onValidateStrategy() {
    this.sTaskService.runTask()
  }
}
