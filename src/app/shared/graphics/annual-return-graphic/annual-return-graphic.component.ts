import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { Operation } from '../../../interfaces/iOperation';
import { InvestmentProfile } from '../../../interfaces/iInvestmentProfile';

@Component({
  selector: 'app-annual-return-graphic',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './annual-return-graphic.component.html',
  styleUrl: './annual-return-graphic.component.scss'
})
export class AnnualReturnGraphicComponent implements OnInit, AfterViewInit{
  public chart: any;
  @Input() id: string = '';
  @Input() title: string = '';
  @Input() operationsPeriod: Operation[] = [];
  @Input() profile!: InvestmentProfile;
  private indexs: any[] = [];
  private annualReturnPeriod1: number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.indexs = Array.from({ length: this.operationsPeriod.length }, (_, i) => {
      return i % 12 === 0 ? i / 12 : null;
    }).filter(value => value !== null);
    
    this.annualReturnPeriod1 = this.CalculateAnnualReturn()
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createHistogram();
    }, 1000);
  }

  createHistogram() {
    this.chart = new Chart(this.id, {
      type: 'bar',
      data: {
        labels: this.indexs,
        datasets: [
          {
            label: 'Period 1',
            data: this.annualReturnPeriod1,
            backgroundColor: this.annualReturnPeriod1.map(value => value < 0 ? 'rgba(255, 99, 132, 0.5)' : 'rgba(54, 162, 235, 0.5)'),
            borderColor: this.annualReturnPeriod1.map(value => value < 0 ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)'),
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            min: 0,
            max: this.indexs.length,
            title: {
              display: true,
              text: 'Value'
            },
            ticks: {
              stepSize: 1 
            }
          },
          y: {
            beginAtZero: true,
            min: Math.min(...this.annualReturnPeriod1)-5,
            max: Math.max(...this.annualReturnPeriod1)+10,
            title: {
              display: true,
              text: 'Values'
            },
            ticks: {
              stepSize: 10
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: this.title
          },
          legend: {
            display: false
          }
        }
      }
    });    
  }

  CalculateAnnualReturn() {
    let annual_return: number = 0;
    let annual_returns: number[] = []
    let capital = this.operationsPeriod[0].total_return;
    for (let i = 0; i < this.operationsPeriod.length; i++) {
      if ((i + 1) % 12 === 0) {
        capital += this.profile.monthly_contribution * 12
        annual_return = (this.operationsPeriod[i].total_return - capital) / capital * 100;
        annual_returns.push(annual_return)
        capital = this.operationsPeriod[i].total_return
      }
    }
    return annual_returns;
  }
}