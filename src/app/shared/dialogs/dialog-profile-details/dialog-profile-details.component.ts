import { Component, Inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { sReport } from '../../../services/sReport.service';
import { sOperation } from '../../../services/sOperation.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { LimitDecimalsPipe } from './../../pipe/limit-decimals.pipe' 
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { Strategy } from '../../../interfaces/iStrategy';
import { CommonModule } from '@angular/common';
import { TotalReturnGraphicComponent } from '../../graphics/total-return-graphic/total-return-graphic.component';
import { IndividualTotalReturnGraphicComponent } from '../../graphics/individual-total-return-graphic/individual-total-return-graphic.component';
import { AnnualReturnGraphicComponent } from '../../graphics/annual-return-graphic/annual-return-graphic.component';
import { Operation } from '../../../interfaces/iOperation';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InvestmentProfile } from '../../../interfaces/iInvestmentProfile';
import { VolatilityGraphicComponent } from '../../graphics/volatility-graphic/volatility-graphic.component';
import { PriceVariationGraphicComponent } from '../../graphics/price-variation-graphic/price-variation-graphic.component';

@Component({
  selector: 'app-dialog-profile-details',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    TotalReturnGraphicComponent,
    IndividualTotalReturnGraphicComponent,
    AnnualReturnGraphicComponent,
    VolatilityGraphicComponent,
    PriceVariationGraphicComponent,
    MatProgressSpinnerModule,
    MatCardModule,
    CommonModule,
    LimitDecimalsPipe,
  ],
  templateUrl: './dialog-profile-details.component.html',
  styleUrl: './dialog-profile-details.component.scss'
})
export class DialogProfileDetailsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'value'];

  dataSource: any[];
  strategy: Strategy;
  profile: InvestmentProfile;
  reportTexts: any;
  operations: Operation[] = [];
  operationsPeriod1: Operation[] = [];
  operationsPeriod2: Operation[] = [];
  operationsPeriod3: Operation[] = [];
  savingReturns: number[] = [];
  indexs: number[] = [];
  inflationRate: number = 0.02;
  tablaDataVariables: any;
  tablaDataRatios: any;

  constructor(
    public dialogRef: MatDialogRef<DialogProfileDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sOperation: sOperation,
    private sReport: sReport,
  ) {
    this.strategy = this.data.obj;
    this.profile = this.data.profile;

    this.tablaDataVariables = [
      {name: 'Initial capital', value: this.profile.initial_capital},
      {name: 'Monthly contribution', value: this.profile.monthly_contribution},
      {name: 'Plataform', value: 'myInvestor'},
      {name: 'Comission', value: 0.42},
      {name: 'Years', value: this.profile.duration}
    ]

    this.tablaDataRatios = [
      {name: 'Sharpe ratio', value: this.strategy.Sharpe},
      {name: 'Sortino ratio', value: this.strategy.Sortino},
      {name: 'Alpha', value: this.strategy.Alpha},
      {name: 'Beta', value: this.strategy.Beta},
      {name: 'Information ratio', value: this.strategy.Information_ratio},
    ]

    let strategyData = this.transformToArrayOfKeyValue(this.data.obj);
    this.dataSource = strategyData.slice(3);
  }
  ngOnInit(): void {
    this.sReport.getReportTexts().subscribe(data => {
      this.reportTexts = data;
    });

    this.sOperation.getList(this.strategy.strategy_id, this.strategy.profile_id).subscribe({
      next: res => {
        this.operations = res.data;
        this.operationsPeriod1 = this.operations.filter(op => op.period === "period_1");
        this.operationsPeriod2 = this.operations.filter(op => op.period === "period_2");
        this.operationsPeriod3 = this.operations.filter(op => op.period === "period_3");
        this.indexs = Array.from({ length: this.operationsPeriod1.length }, (_, i) => i + 1);
        this.savingReturns = Array.from(
          { length: this.operationsPeriod1.length },
          (_, i) => {
            let adjustedCapital = this.profile.initial_capital + (i * this.profile.monthly_contribution);
            const yearsPassed = Math.floor(i / 12);
            if (yearsPassed > 0) {
              adjustedCapital *= Math.pow(1 - this.inflationRate, yearsPassed);
            }
            return adjustedCapital;
          }
        );        
      }, error: error => console.error(error)
    })
  }

  private transformToArrayOfKeyValue(obj: Strategy) {
    let key_mapping: { [key in keyof Strategy]?: string } = {
      "name": "Name",
      "description": "Description",
      "Total_profitability": "Total Profitability",
      "Volatility": "Volatility",
      "Maximum_loss": "Maximum Loss",
      "Sharpe": "Sharpe Ratio",
      "Sortino": "Sortino Ratio",
      "Alpha": "Alpha",
      "Beta": "Beta",
      "Information_ratio": "Information Ratio",
      "Success_rate": "Success Rate",
      "Portfolio_concentration_ratio": "Portfolio Concentration Ratio",
      "annual_return": "Annual Return"
  }
  let rows = Object.entries(obj).map(([key, value]) => ({
    key: key_mapping[key as keyof Strategy] || key,
    value: value
  }));

  return rows;
  }
}
