import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { Operation } from '../../../interfaces/iOperation';

@Component({
  selector: 'price-variation-graphic',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './price-variation-graphic.component.html',
  styleUrl: './price-variation-graphic.component.scss'
})
export class PriceVariationGraphicComponent implements OnInit, AfterViewInit{
  public chart: any;
  @Input() id: string = '';
  @Input() tag: string = '';
  @Input() borderColor: string = 'rgb(135, 206, 235)'
  @Input() backgroundColor: string = 'rgba(135, 206, 235, 0.2)'
  @Input() title: string = '';
  @Input() indexs: number[] = [];
  @Input() operationsPeriod: Operation[] = [];


  private priceVariations: number[] = [];

  constructor() { }

  ngOnInit(): void {
    let total = 0;
    this.priceVariations = Array.from(
      { length: this.operationsPeriod.length },
      (_, i) => {
        if (i === 0) {
          console.log(`new: ${this.operationsPeriod[i].total_return}, old: ${1100}`)
          total = ((this.operationsPeriod[i].total_return - 1100) / 1100) * 100
          return total
        }
        console.log(`new: ${this.operationsPeriod[i].total_return}, old: ${this.operationsPeriod[i - 1].total_return}`)
        total += ((this.operationsPeriod[i].total_return - 100 - this.operationsPeriod[i - 1].total_return) / this.operationsPeriod[i - 1].total_return) * 100
        return total
      }
    );

    this.priceVariations.unshift(0)
    this.indexs.push(this.indexs[this.indexs.length - 1] + 1)
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createChart();
    }, 1000);
  }

  createChart(){
    this.chart = new Chart(`${this.id}`, {
      type: 'line', 
      data: {
        labels: this.indexs, 
	       datasets: [
          {
            label: 'Period 1',
            data: this.priceVariations,
            borderColor: this.borderColor,
            backgroundColor: this.backgroundColor,
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