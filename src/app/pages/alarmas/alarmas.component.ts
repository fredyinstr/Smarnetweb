import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import Swal from 'sweetalert2'; // https://www.npmjs.com/package/sweetalert2
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UsuarioService } from 'src/app/services/UsuarioService';


@Component({
  selector: 'app-alarmas',
  templateUrl: './alarmas.component.html',
  styleUrls: ['./alarmas.component.css']
})
export class AlarmasComponent implements OnInit {
  notificaciones: any;
  clicked = false;
  telefono1 = '';
  correo1 = '';
  correo2 = '';

  constructor( public _dataService: DataService, public _usuario:UsuarioService ) { }
  generarPdf() {
    const doc = new jsPDF();
    doc.autoTable({html: '#notificacionesTable'});
    doc.save('notificaciones.pdf');
  }

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
    this._dataService.notificaciones(5)
    .subscribe( (resp: any) => {
    // console.log('Respuesta: ', resp['taginfo'] );
    const notificaciones: any = resp['notificaciones'];
    // console.log('Notificaciones: ', notificaciones);
    this.notificaciones = resp['notificaciones'];
    this.clicked = false;
  });
}

  revisar(noti_id) {
    this.clicked = true;
    this._dataService.revisarNotificacion( noti_id )
    .subscribe( ( resp: any ) => {
      // console.log('Recibido revisar: ', resp);
      this.cargarNotificaciones();
    });
  }

  actualizarMedios() {
    this._dataService.updateMedioNotificaciones(5, this.telefono1, this.correo1, this.correo2)
      .subscribe( (resp: any) => {
        // console.log('respuesta guardar limites: ', resp );
        Swal.fire('OK', resp.respuesta, 'success');
      });
  }

  ngOnInit() {
    this._dataService.ObtenerMedioNotificaciones(5)
      .subscribe( (resp: any ) => {
        // console.log('respuesta medios: ', resp);
        this.telefono1 = resp.medios.telefono1 === 'null' ? 'Sin definir' : resp.medios.telefono1;
        this.correo1 = resp.medios.correo1 === 'null' ? 'Sin definir' : resp.medios.correo1;
        this.correo2 = resp.medios.correo2 === 'null' ? 'Sin definir' : resp.medios.correo2;
      });
    this.cargarNotificaciones();
  }

}
