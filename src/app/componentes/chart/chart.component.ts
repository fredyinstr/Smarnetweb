import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { timer} from 'rxjs';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {

  private alive  = true;
  @Input() tag_id: any;

   // lineChart

   public lineChartLegend = true;
   public lineChartType = 'line';
   public lineChartData: Array<any> = [
   {
     data: [
     {x: 0, y: 0},
     {x: 5, y: 0},
     {x: 10, y: 0},
     {x: 15, y: 0},
     {x: 20, y: 0},
     {x: 25, y: 0},
     {x: 30, y: 0}
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

  constructor( public _dataService: DataService) { }

  ngOnInit() {
    this._dataService.taginfo(this.tag_id)
    .subscribe( (resp: any) => {
      console.log('Respuesta chart: ', resp['taginfo'] );
      const taginfo: any = resp['taginfo'];
    });


    timer(100, 60000).pipe(takeWhile(() => this.alive)).subscribe(() => {
        console.log('obteniendo Chart...');
        this._dataService.actualizaChart(this.tag_id)
        .subscribe((data: any) => {
          console.log('Data chart: ' + data['data']);
          this.lineChartData = data['data'];
        });

      });





  }

  ngOnDestroy() {
    this.alive = false;
  }

}
