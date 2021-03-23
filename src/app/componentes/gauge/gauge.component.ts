import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { timer} from 'rxjs';
import {takeWhile} from 'rxjs/operators';


@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent implements OnInit, OnDestroy {

  @Input() tag_id: any;
  @Input() lim_bajo: any;
  @Input() lim_alto: any;


  constructor( public _dataService: DataService) { }

  options = null;
  max = null;
  value = null;
  private alive = true;
  fecha: any;
  verde = true;
  azul = false;
  rojo = false;
  verde1 = false;
  naranja = false;

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

  ngOnInit() {
    this._dataService.taginfo(this.tag_id)
    .subscribe( (resp: any) => {
      // console.log('Respuesta TAG INFO: ', resp['taginfo'] );
      const taginfo: any = resp['taginfo'];
      this.lim_bajo = taginfo.m3;
      this.lim_alto = taginfo.m2;
      this.options = {
        title: taginfo.tag_descripcion,
        titleFontColor : 'black',
        min: taginfo.tag_valor_min,
        pointer: false,
        decimals: 2,
        gaugeWidthScale : 0.8,
        counter: true,
        symbol: taginfo.tag_symbol,
        // label: this.fecha,
        labelFontColor: 'black',
        shadowOpacity: 1,
        shadowSize: 5,
        shadowVerticalOffset: 1,
        valueFontFamily: 'Arial, Helvetica, sans-serif',
        valueFontSize: '5px'
      };
      this.max = taginfo.tag_valor_max;
      this.value = taginfo.tag_valor_min;
    });

    
    timer(500, 50000).pipe(takeWhile(() => this.alive)).subscribe(() => {
      //  console.log('solicitando datos...');
       this._dataService.datatag(this.tag_id)
       .subscribe( (resp: any) => {
         this.verde = false;
         this.rojo = false;
         this.azul = false;
         this.verde1 = false;
         this.naranja = false;
        // console.log('Respuesta datatag: ', resp['datatag'] );
        const datatag = resp['datatag'];
        if (!datatag) {
          this.value = 0;
        }else {
          if (Number(datatag.sensordata_valor) > Number(this.lim_alto)) {
            this.rojo = true;
          } else if (Number(datatag.sensordata_valor) < Number(this.lim_bajo)) {
            this.naranja = true;
          } else {
            this.verde1 = true;
          }
          this.value = datatag.sensordata_valor;
          this.fecha = this.retornaFecha(datatag.sensordata_fecha_hora);
        }
          // if (Number(this.value) > Number(this.lim_alto)) {
          //   this.rojo = true;
          // } else if (Number(this.value) < Number(this.lim_bajo)) {
          //   this.azul = true;
          // } else {
          //   this.verde = true;
          // }
       });

       });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
