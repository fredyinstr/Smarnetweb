import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { URL_SERVICIOS } from '../config/config';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( public http: HttpClient ) {
    console.log('Data service online');
   }

   public taginfo( tag ) {
    const url = URL_SERVICIOS + 'iotdata/taginfo/' + tag;
    return this.http.get(url);
  }

  public datatag( tag ) {
    const url = URL_SERVICIOS + 'iotdata/datatag/' + tag;
    return this.http.get(url);
  }

  actualizaChart(tag: any) {
    const url = URL_SERVICIOS + 'iotdata/historico/' + tag;
    return this.http.get(url);
  }

  notificaciones(cliente: any) {
    const url = URL_SERVICIOS + 'iotdata/notificaciones/' + cliente;
    return this.http.get(url);
  }

  revisarNotificacion( noti_id: any ) {
    const url = URL_SERVICIOS + 'iotdata/revisarNotificacion/' + noti_id;
    console.log('Revisar: ', noti_id);
    // const data = new URLSearchParams();
    // data.append('noti_id', notificacion);
    return this.http.get(url);
  }

  tagsPorCliente( cliente_id: any ) {
    const url = URL_SERVICIOS + 'iotdata/tagsByClient/' + cliente_id;
    return this.http.get(url);
  }
}
