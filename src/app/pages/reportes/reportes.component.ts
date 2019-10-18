import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
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
  pdf = false;
  unit = 'minute';
  repDesde = '';
  repHasta = '';


  constructor( private _dataService: DataService) { }

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
    return mesdia + ' a las ' + d.getHours() + ':' + String(minutes > 9 ? minutes : '0' + minutes) + ' horas';
  }

  generarPdf () {
    const descripcion = 'SMARNET V1.3 - Reporte ' + document.getElementById('descripcion').innerHTML;
    this._dataService.loadChart(this.tag_id, this.fechaDesde, this.fechaHasta)
      .subscribe((resp: any) => {
        console.log('Reporte para pdf: ', resp.data);
        const doc = new jsPDF();
        const col = [['Fecha', 'Valor medido']];
        const rows = [];
        resp.data.forEach(element => {
        const temp = [element.t, element.y + ' cm'];
        rows.push(temp);
        });
        doc.autoTableSetDefaults({
          headStyles: {fillColor: [48, 176, 240]},
          margin: {top: 25},
          didDrawPage: function(data) {
              doc.setFontSize(20);
              doc.text(descripcion, data.settings.margin.left, 20);
          }
      });
        doc.autoTable({
          head: col,
          body: rows
      });
      // doc.autoTable(col, rows);
      doc.save('Reporte.pdf');
      this.pdf = false;
      });
  }

  selectTag(event) {
    this.tagSeleccionado = event.target.value;
  }

  convertirFecha (d, h) {
    const horas = h.getHours();
    const minutos = h.getMinutes();
    const segundos = h.getSeconds();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() +
    ' ' + horas + ':' + minutos + ':' + segundos;
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
    // if ((millisHasta - millisDesde) > 864000000) {
    //   Swal.fire('Oops...', 'Periodo máximo 10 días!', 'error');
    //   return;
    // }
    if ((millisHasta - millisDesde) > 86400000) {
      this.unit = 'day';
    }
    this.pdf = true;
    this.tag_id = this.tagSeleccionado;
    this.fechaDesde = this.convertirFecha( this.fd, this.hd);
    this.fechaHasta = this.convertirFecha( this.fh, this.hh);
    this.repDesde = this.retornaFecha(this.fechaDesde);
    this.repHasta = this.retornaFecha(this.fechaHasta);
    console.log('Fecha desde: ', this.fechaDesde);
    console.log('Fecha hasta: ', this.fechaHasta);
    console.log('Unit: ', this.unit);
  }

  ngOnInit() {
    const desde = new Date();
    desde.setDate(desde.getDate());
    this.fd = desde;
    this.fh = new Date();
    this.hd = new Date();
    this.hd.setHours(0, 0, 0, 0);
    this.hh = new Date();


    this._dataService.tagsPorCliente(2)
      .subscribe((resp: any) => {
        console.log(resp);
        this.tag_list = resp.tags;
      });
  }


}
