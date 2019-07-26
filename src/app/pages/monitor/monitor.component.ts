import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {
  tag_id = '29';

  tags: any [] = [];

  options = {
    title: 'Bloque 1 T1'
  };
  max = 100;
  value = 67;

   // lineChart

    public lineChartLegend = true;
    public lineChartType = 'line';
    public lineChartData: Array<any> = [
    {
      data: [
      {x: 0, y: 0},
      {x: 5, y: 12},
      {x: 10, y: 1},
      {x: 15, y: 6},
      {x: 20, y: 18},
      {x: 25, y: 4},
      {x: 30, y: 25}
    ]}
  ];


  public lineChartOptions: any = {
    scales: {
            xAxes: [{
              time: {
                unit: 'minute'
                },
                type: 'time',
                distribution: 'series',
                position: 'bottom'
            }],
            yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
        },
        responsive: true,
        animation: false,
        legend: {
            display: false
          },
          elements: {
            line: {
              fill: false,
              tension: false
            },
          }

  };

  constructor( private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.tagsPorCliente(1)
      .subscribe((resp: any) => {
        console.log('Tags por cliente: ', resp.tags);
        this.tags = resp.tags;
      });
  }

}
