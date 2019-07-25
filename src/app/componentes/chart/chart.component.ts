import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { DataService } from '../../services/data.service';
import { timer} from 'rxjs';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy, OnChanges {

  private alive  = true;
  @Input() tag_id: any;
  @Input() continuo = true;
  @Input() desde = '';
  @Input() hasta = '';

   // lineChart

   public lineChartLegend = true;
   public lineChartType = 'line';
   public lineChartData: Array<any> = [
   {
     data: []
    }
 ];

legend = 'Temp °C';
public lineChartOptions: any = {
  scales: {
          xAxes: [{
            time: {
              unit: 'minute'
              },
              type: 'time',
              distribution: 'series',
              position: 'bottom',
              ticks: {
               autoSkip: true
             }
          }],
          yAxes: [{
            ticks: {
               //  beginAtZero: true
               source: 'auto'
            },
            scaleLabel: {
             display: true,
             labelString: this.legend
           }
        }]
      },
      responsive: true,
      animation: false,
      legend: {
          display: false
        },
        tooltips: {
         mode: 'index',
         // position: 'cursor',
         intersect: false
       },
        elements: {
          line: {
            fill: false,
            tension: false,
            lineTension: 0,
            borderWidth: 1.5
          },
          point: {
           radius: 0
           }
        }

};

  constructor( public _dataService: DataService) { }

  actualizar() {
    this._dataService.actualizaChart(this.tag_id, this.desde, this.hasta)
          .subscribe((data: any) => {
            console.log('Data chart: ' + data['data']);
            this.lineChartData = data['data'];
          });
  }

  ngOnChanges() {
    console.log('Ocurrió un cambio...', this.tag_id);
    this.actualizar();
  }

  ngOnInit() {
    // this._dataService.taginfo(this.tag_id)
    // .subscribe( (resp: any) => {
    //   console.log('Respuesta chart: ', resp['taginfo'] );
    //   const taginfo: any = resp['taginfo'];
    // });


    if (this.continuo) {
      timer(100, 10000).pipe(takeWhile(() => this.alive)).subscribe(() => {
          console.log('obteniendo Chart...');
          this.actualizar();
        });
      } else {
        this.actualizar();
      }
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
