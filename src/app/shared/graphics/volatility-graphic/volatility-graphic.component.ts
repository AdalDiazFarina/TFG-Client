import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { Operation } from '../../../interfaces/iOperation';
import { InvestmentProfile } from '../../../interfaces/iInvestmentProfile';
import { Strategy } from '../../../interfaces/iStrategy';

@Component({
  selector: 'app-volatility-graphic',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './volatility-graphic.component.html',
  styleUrl: './volatility-graphic.component.scss'
})
export class VolatilityGraphicComponent implements OnInit, AfterViewInit{
  public chart: any;
  @Input() id = '';
  @Input() title: string = '';
  @Input() indexs: Number[] = [];
  @Input() profile!: InvestmentProfile;
  @Input() strategy!: Strategy;
  @Input() operationsPeriod: Operation[] = [];

  private returnsPeriod: number[] = [];
  private expectedGrow: number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.returnsPeriod = this.operationsPeriod.map(op => op.total_return);
    let previousCapital = 0;
    this.expectedGrow = Array.from(
      { length: this.operationsPeriod.length },
      (_, i) => {
        let growRate = (this.strategy.annual_return / 12) / 100;
        if (i === 0) {
          previousCapital = this.profile.initial_capital * (1 + growRate) + this.profile.monthly_contribution;
          return previousCapital
        } else {
          previousCapital = previousCapital * (1 + growRate) + this.profile.monthly_contribution;
          return previousCapital;
        }
      }
    );
    console.log('returnsPeriod: ', this.returnsPeriod)
    console.log('expectedGrow: ', this.expectedGrow)
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart(){
    this.chart = new Chart(this.id, {
      type: 'line', 
      data: {
        labels: this.indexs, 
	       datasets: [
          {
            label: 'Period',
            data: this.returnsPeriod,
            borderColor: 'rgb(135, 206, 235)',
            backgroundColor: 'rgba(135, 206, 235, 0.2)',
            borderWidth: 1
          },
          {
            label: 'Expected grow',
            data: this.expectedGrow,
            borderColor: 'rgb(255, 127, 80)',
            backgroundColor: 'rgba(255, 127, 80, 0.2)',
            borderWidth: 1
          },
        ]
      },
      options: {
        plugins: {
          title: {
              display: true,
              text: `${this.title}`
          },
          legend: {
              display: true,
              position: 'top'
          }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
        animation: {
            duration: 2000,
            easing: 'easeInOutBounce' 
        },
      } 
    });
  }
}