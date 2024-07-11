import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { Operation } from '../../../interfaces/iOperation';

@Component({
  selector: 'app-individual-total-return-graphic',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './individual-total-return-graphic.component.html',
  styleUrl: './individual-total-return-graphic.component.scss'
})
export class IndividualTotalReturnGraphicComponent implements OnInit, AfterViewInit{
  public chart: any;
  @Input() id: string = '';
  @Input() tag: string = '';
  @Input() borderColor: string = 'rgb(135, 206, 235)'
  @Input() backgroundColor: string = 'rgba(135, 206, 235, 0.2)'
  @Input() title: string = '';
  @Input() indexs: Number[] = [];
  @Input() operationsPeriod: Operation[] = [];
  @Input() savingReturns: Number[] = [];


  private returnsPeriod: Number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.returnsPeriod = this.operationsPeriod.map(op => op.total_return)
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart(){
    this.chart = new Chart(`${this.id}`, {
      type: 'line', 
      data: {
        labels: this.indexs, 
	       datasets: [
          {
            label: 'Period 1',
            data: this.returnsPeriod,
            borderColor: this.borderColor,
            backgroundColor: this.backgroundColor,
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