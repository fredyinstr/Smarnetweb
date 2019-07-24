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


  constructor( public _dataService: DataService) { }

  options = null;
  max = null;
  value = null;
  private alive = true;
  fecha: any;

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
      // console.log('Respuesta: ', resp['taginfo'] );
      const taginfo: any = resp['taginfo'];
      this.options = {
        title: taginfo.tag_descripcion,
        min: taginfo.tag_valor_min,
        pointer: false,
        decimals: 2,
        gaugeWidthScale : 0.8,
        counter: true,
        symbol: '°C'
      };
      this.max = taginfo.tag_valor_max;
      this.value = taginfo.tag_valor_min;
    });


    timer(100, 60000).pipe(takeWhile(() => this.alive)).subscribe(() => {
       console.log('solicitando datos...');
       this._dataService.datatag(this.tag_id)
       .subscribe( (resp: any) => {
        // console.log('Respuesta datatag: ', resp['datatag'] );
        const datatag = resp['datatag'];
        this.value = datatag.sensordata_valor;
        this.fecha = this.retornaFecha(datatag.sensordata_fecha_hora);
       });

       });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
