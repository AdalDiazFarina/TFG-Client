import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { Operation } from '../../../interfaces/iOperation';
import { InvestmentProfile } from '../../../interfaces/iInvestmentProfile';

@Component({
  selector: 'app-total-return-graphic',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './total-return-graphic.component.html',
  styleUrl: './total-return-graphic.component.scss'
})
export class TotalReturnGraphicComponent implements OnInit, AfterViewInit{
  public chart: any;
  @Input() title: string = '';
  @Input() indexs: Number[] = [];
  @Input() profile!: InvestmentProfile;
  @Input() operationsPeriod1: Operation[] = [];
  @Input() operationsPeriod2: Operation[] = [];
  @Input() operationsPeriod3: Operation[] = [];
  @Input() savingReturns: Number[] = [];

  private returnsPeriod1: Number[] = [];
  private returnsPeriod2: Number[] = [];
  private returnsPeriod3: Number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.returnsPeriod1 = this.operationsPeriod1.map(op => op.total_return)
    this.returnsPeriod2 = this.operationsPeriod2.map(op => op.total_return)
    this.returnsPeriod3 = this.operationsPeriod3.map(op => op.total_return)
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart(){
    this.chart = new Chart("MyChart", {
      type: 'line', 
      data: {
        labels: this.indexs, 
	       datasets: [
          {
            label: 'Period 1',
            data: this.returnsPeriod1,
            borderColor: 'rgb(135, 206, 235)',
            backgroundColor: 'rgba(135, 206, 235, 0.2)',
            borderWidth: 1
          },
          {
            label: 'Period 2',
            data: this.returnsPeriod2,
            borderColor: 'rgb(255, 127, 80)',
            backgroundColor: 'rgba(255, 127, 80, 0.2)',
            borderWidth: 1
          },
          {
            label: 'Period 3',
            data: this.returnsPeriod3,
            borderColor: 'rgb(60, 179, 113)',
            backgroundColor: 'rgba(60, 179, 113, 0.2)',
            borderWidth: 1
          },
          {
            label: 'Savings',
            data: this.savingReturns,
            borderColor: 'rgb(255, 223, 0)',
            backgroundColor: 'rgba(255, 223, 0, 0.2)',
            borderWidth: 1
          }
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