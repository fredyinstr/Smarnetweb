import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { URL_SERVICIOS, URL_API } from '../config/config';



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
    // const url = URL_SERVICIOS + 'iotdata/datatag/' + tag;
    const url = URL_API + 'data/' + tag;
    return this.http.get(url);
  }

  loadChart(tag: any, desde: any = '', hasta: any = '') {
    // const url = URL_SERVICIOS + 'iotdata/historico/' + tag;
    // return this.http.get(url);
    let params = new HttpParams();
    params = params.append('desde', desde);
    params = params.append('hasta', hasta);
    const url = URL_SERVICIOS + 'iotdata/historico/' + tag;
    // const url = URL_API + 'data/historico/' + tag;
    return this.http.get(url, { params: params });
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

  limitesTag( tag_id: any ) {
    const url = URL_SERVICIOS + 'iotdata/limitesTag/' + tag_id;
    return this.http.get(url);
  }
  updateLimitesTag( tag_id: any, m1: any = '', m2: any = '', tiemponot: any = '', nombre: any = '' ) {
    let params = new HttpParams();
    params = params.append('m1', m1);
    params = params.append('m2', m2);
    params = params.append('tiemponot', tiemponot);
    params = params.append('nombre', nombre);
    const url = URL_SERVICIOS + 'iotdata/updateLimitesTag/' + tag_id;
    return this.http.get(url, { params: params });
  }

  ObtenerMedioNotificaciones( cliente_id: any ) {
    const url = URL_SERVICIOS + 'iotdata/medioNotificaciones/' + cliente_id;
    return this.http.get(url);
  }
  updateMedioNotificaciones( cliente_id: any, telefono1: any = '', correo1: any = '', correo2: any = '' ) {
    if ( (telefono1.trim() === '') || (telefono1.trim() === 'Sin definir') ) {
      telefono1 = 'null';
    }
    if ( (correo1.trim() === '') || (correo1.trim() === 'Sin definir') ) {
      correo1 = 'null';
    }
    if ( (correo2.trim() === '') || (correo2.trim() === 'Sin definir') ) {
      correo2 = 'null';
    }
    let params = new HttpParams();
    params = params.append('telefono1', telefono1);
    params = params.append('correo1', correo1);
    params = params.append('correo2', correo2);
    const url = URL_SERVICIOS + 'iotdata/updateMedioNotificaciones/' + cliente_id;
    return this.http.get(url, { params: params });
  }

  cargarChart(tag) {
    const url = URL_API + 'data/chartdata/' + tag;
    return this.http.get(url);
  }
  lastData(tag) {
    const url = URL_API + 'data/' + tag;
    return this.http.get(url);
  }
}
