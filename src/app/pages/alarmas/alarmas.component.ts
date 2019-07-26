import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-alarmas',
  templateUrl: './alarmas.component.html',
  styleUrls: ['./alarmas.component.css']
})
export class AlarmasComponent implements OnInit {
  notificaciones: any;
  clicked = false;

  constructor( public _dataService: DataService ) { }

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

  cargarNotificaciones() {
    this._dataService.notificaciones(1)
    .subscribe( (resp: any) => {
    // console.log('Respuesta: ', resp['taginfo'] );
    const notificaciones: any = resp['notificaciones'];
    console.log('Notificaciones: ', notificaciones);
    this.notificaciones = resp['notificaciones'];
    this.clicked = false;
  });
}

  revisar(noti_id) {
    this.clicked = true;
    this._dataService.revisarNotificacion( noti_id )
    .subscribe( ( resp: any ) => {
      console.log('Recibido revisar: ', resp);
      this.cargarNotificaciones();
    });
  }
  ngOnInit() {
    this.cargarNotificaciones();
  }

}
