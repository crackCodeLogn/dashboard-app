import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js/auto";
import {FinService} from "../../services/fin.service";
import {IMarketData} from "../../model/IMarketData";
import _default from "chart.js/dist/core/core.interaction";
import {ApexChart} from "ng-apexcharts";
import * as ApexCharts from 'apexcharts';
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  private dates: number[] = [];
  private prices: string[] = [];
  private symbol: string = "";

  constructor(private finService: FinService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.createChart();
  }

  private createChart() {
    // this.symbol = this.route.snapshot.params['id'];
    this.symbol = "CM";
    this.finService.getMarketData(this.symbol, "2022-10-10", "2023-10-11").subscribe(
      (marketData: IMarketData) => {
        console.log(marketData);
        const n: number | undefined = marketData.data?.length;
        // this.symbol = marketData.symbol;
        let chartData = [];

        if (n) {
          for (let i = 0; i < n; i++) {
            if (marketData.data) {
              let x = new Date(marketData.data[i].date).getTime()
              this.dates.push(x);
              let y = Number(marketData.data[i].price).toFixed(2);
              this.prices.push(y);
              chartData.push({x: x, y: y})
              //chartData.push({x: marketData.data[i].date, y: y})
            }
          }
        }

        console.log(this.prices);
        console.log(this.dates);

        var options = {
          chart: {
            type: 'line',
            height: 650,
            stacked: false
          },
          tooltip: {
            enabled: true,
            y: {
              formatter: function (val: string) {
                return "$ " + val
              }
            }
          },
          series: [
            {
              name: this.symbol,
              data: chartData
            }
          ],
          xaxis: {
            type: 'datetime'
          },
          yaxis: {
            title: {
              text: "Price"
            }
          }
        }
        var chart = new ApexCharts(document.getElementById("lineChart"), options);
        chart.render()

        /*
        //this is for chartjs
        this.chart = new Chart("lineChart", {
          type: "line",
          data: {
            labels: this.dates,
            datasets: [
              {
                label: this.symbol,
                data: this.prices
              }
            ]
          },
          options: {
            maintainAspectRatio: true,
            responsive: true,
            interaction: {
              intersect: false,
              mode: 'index',
            },
            plugins: {
              tooltip: {
                footerFont: {
                  size: 15
                },
                callbacks: {
                  footer: ((tooltipItems: any) => {
                    let value: number = Number(tooltipItems[0].parsed.y);
                    let date: string = this.dates[tooltipItems[0].parsed.x];
                    return "$ " + value.toFixed(2);
                  }),
                  label: () => {
                    return ""
                  },
                }
              }
            }
          }
        });*/
      }
    )

  }

}
