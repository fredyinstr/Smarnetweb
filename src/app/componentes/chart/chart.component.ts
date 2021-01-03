import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { DataService } from '../../services/data.service';
import { timer} from 'rxjs';
import {takeWhile} from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/UsuarioService';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy, OnChanges {

  private alive  = true;
  @Input() tag_id: any;
  // @Input() tag: any;
  @Input() continuo = true;
  @Input() unit = 'day';
  @Input() desde = '';
  @Input() hasta = '';

  fechaUltimo = '';
  minimo = '';
  maximo = '';
  promedio = '';
  repDesde = '';
  repHasta = '';
  show = true;
   // lineChart

   public lineChartLegend = true;
   public lineChartType = 'line';
   public lineChartData: Array<any> = [
   {
     data: []
    }
 ];

 private lineChartData1: Array<any> = [
  {
    data: []
   }
];



// legend = this.tag_id;
 legend = 'Nivel';
// public lineChartOptions: any;
public lineChartOptions: any = {
  scales: {
          xAxes: [{
            time: {
              unit: this.unit
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
            borderWidth: 0.6
          },
          point: {
           radius: 0
           }
        },
          annotation: {
          annotations: [{
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: '-4',
              borderColor: 'red',
              borderWidth: 2
          }]
        }

};

  constructor( public _dataService: DataService, private _usuario: UsuarioService) { }

  retornaFecha( fecha ) {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const d = new Date(fecha);
    const hoy = new Date();

    const mes = meses[d.getMonth()];
    const dia = d.getDate();
    let mesdia = mes + ' ' + dia;
    if ((d.getMonth === hoy.getMonth) && (d.getDate() === hoy.getDate())) {
      mesdia = 'Hoy';
    }
    const minutes = d.getMinutes();
    return mesdia + ' ' + d.getHours() + ':' + String(minutes > 9 ? minutes : '0' + minutes);
  }

  resetData() {
    this.lineChartData = [
     {
       data: []
      }
   ];
  }

  initChart() {
    this.show = false;
    this.resetData();
    // console.log('Unit desde chart: ', this.unit);
    this._dataService.loadChart(this.tag_id, this.desde, this.hasta)
    .subscribe((data: any) => {
      //  console.log('Data chart: ' + data['minimo']);
       this.minimo = data['minimo'];
       this.maximo = data['maximo'];
       this.promedio = Number(data['promedio']).toFixed(2);
        this.lineChartOptions.scales.xAxes[0].time.unit = this.unit;
        this.lineChartData1 = data['data'];
        this.fechaUltimo = this.lineChartData1[(this.lineChartData1.length - 1)].t;
        // console.log ('ultimo dato: ', this.fechaUltimo);
        this.lineChartData = this.lineChartData1;
        this.legend = ':)';
        this.show = true;
      });
  }

  actualizar() {
    if (this.tag_id) {
      this._dataService.datatag(this.tag_id)
       .subscribe( (resp: any) => {
        const datatag = resp.datatag;
        const fecha = datatag.sensordata_fecha_hora;
        if (fecha !== this.fechaUltimo) {
          // console.log('fecha: ', fecha);
          // console.log ('fecha ultimo: ', this.fechaUltimo);
          const valor = datatag.sensordata_valor;
          const temp = {y: valor, t: fecha};
          this.fechaUltimo = fecha;
          this.lineChartData1.push(temp);
          // console.log ('dataTag: ', datatag);
          // const temp1: any = this.lineChartData;
          // temp1.shift();
          // temp1.push(temp);
          // this.lineChartData = temp1;
          // console.log ('line char: ', this.lineChartData);
          // this.value = datatag.sensordata_valor;
          this.lineChartData = this.lineChartData1;
        }
       });
          } else {
            return;
          }
  }

  ngOnChanges() {
    // console.log('Ocurrió un cambio...', this.tag_id);
    // this.show = false;
    // this.lineChartOptions = {
    //   scales: {
    //           xAxes: [{
    //             time: {
    //               unit: this.unit
    //               },
    //               type: 'time',
    //               distribution: 'series',
    //               position: 'bottom',
    //               ticks: {
    //                autoSkip: true
    //              }
    //           }],
    //           yAxes: [{
    //             ticks: {
    //                //  beginAtZero: true
    //                source: 'auto'
    //             },
    //             scaleLabel: {
    //              display: true,
    //              labelString: this.tag_id // this.tag.tag_descripcion + ' ' + this.tag.tag_symbol
    //            }
    //         }]
    //       },
    //       responsive: true,
    //       animation: false,
    //       legend: {
    //           display: false
    //         },
    //         tooltips: {
    //          mode: 'index',
    //          // position: 'cursor',
    //          intersect: false
    //        },
    //         elements: {
    //           line: {
    //             fill: false,
    //             tension: false,
    //             lineTension: 0,
    //             borderWidth: 1.0
    //           },
    //           point: {
    //            radius: 0
    //            }
    //         },
    //           annotation: {
    //           annotations: [{
    //               type: 'line',
    //               mode: 'horizontal',
    //               scaleID: 'y-axis-0',
    //               value: '-4',
    //               borderColor: 'red',
    //               borderWidth: 2
    //           }]
    //         }
    // };
      this.initChart();
  }

  ngOnInit() {
    // console.log('Desde: ', this.desde);
    // console.log('Hasta: ', this.hasta);

    // this.initChart();

    if (this.continuo) {
      timer(5000, 50000).pipe(takeWhile(() => this.alive)).subscribe(() => {
          // console.log('Actualizando Chart...');
          this.actualizar();
        });
      }
  }


  ngOnDestroy() {
    this.alive = false;
  }

}
