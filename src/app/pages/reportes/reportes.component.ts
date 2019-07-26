import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import Swal from 'sweetalert2'; // https://www.npmjs.com/package/sweetalert2


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  tagSeleccionado = '';
  tag_id;
  tag_list = [];
  fechaDesde = '';
  fechaHasta = '';
  horaDesde = '';
  horaHasta = '';
  fd: Date;
  fh: Date;
  hd: Date;
  hh: Date;
  ismeridian = false;

  constructor( private _dataService: DataService) { }

  selectTag(event) {
    this.tagSeleccionado = event.target.value;
  }

  convertirFecha (d, h) {
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() +
    ' ' + h.getHours() + ':' + h.getMinutes() + ':' + h.getSeconds();
  }


  buscar() {
    const millisDesde = new Date(this.convertirFecha(this.fd, this.hd)).getTime();
    const millisHasta = new Date(this.convertirFecha(this.fh, this.hh)).getTime();
    if (this.tagSeleccionado === '') {
      console.log('Debe seleccionar un Tag');
      Swal.fire('Oops...', 'Debe seleccionar un Tag!', 'error');
      return;
    }
    if (millisDesde > millisHasta) {
      console.log('Fecha desde no puede ser mayor a fecha hasta');
      Swal.fire('Oops...', 'Fecha desde no puede ser mayor a fecha hasta!', 'error');
      return;
    }
    if (millisHasta > new Date().getTime()) {
      Swal.fire('Oops...', 'Fecha hasta no puede ser mayor a la fecha actual!', 'error');
      return;
    }
    if ((millisHasta - millisDesde) > 864000000) {
      Swal.fire('Oops...', 'Periodo máximo 10 días!', 'error');
      return;
    }
    this.tag_id = this.tagSeleccionado;
    this.fechaDesde = this.convertirFecha( this.fd, this.hd);
    this.fechaHasta = this.convertirFecha( this.fh, this.hh);
    console.log('Fecha desde: ', this.fechaDesde);
    console.log('Fecha hasta: ', this.fechaHasta);
  }

  ngOnInit() {
    const desde = new Date();
    desde.setDate(desde.getDate() - 1);
    this.fd = desde;
    this.fh = new Date();
    this.hd = new Date();
    this.hh = new Date();


    this._dataService.tagsPorCliente(1)
      .subscribe((resp: any) => {
        console.log(resp);
        this.tag_list = resp.tags;
      });
  }


}
