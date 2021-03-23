import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { UsuarioService } from '../../services/UsuarioService';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2'; // https://www.npmjs.com/package/sweetalert2
import { ExportToCsv } from 'export-to-csv';

var data = [
  {
    name: 'Test 1',
    age: 13,
    average: 8.2,
    approved: true,
    description: "using 'Content here, content here' "
  },
  {
    name: 'Test 2',
    age: 11,
    average: 8.2,
    approved: true,
    description: "using 'Content here, content here' "
  },
  {
    name: 'Test 4',
    age: 10,
    average: 8.2,
    approved: true,
    description: "using 'Content here, content here' "
  },
];
 
  const options = { 
    fieldSeparator: ';',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: false,
    title: 'ReporteCSV', 
    useTextFile: false,
    useBom: true,
    // useKeysAsHeaders: false,
    headers: ['VALOR', 'FECHA']
  };



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
  reporte = [];
  objetoTagSeleccionado = null;
  status = '';

  
  
  constructor( private _dataService: DataService, 
    private _usuario: UsuarioService) { }
    
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

    generarCsv() {
      options.title = document.getElementById('descripcion').innerHTML;
      const csvExporter = new ExportToCsv(options);
      csvExporter.generateCsv(this.reporte);
    }
    
    generarPdf () {
      const descripcion = 'VARSTRACKING V1.3 - Reporte ' + document.getElementById('descripcion').innerHTML;
    console.log("Desde: ", this.fechaDesde);
    
    // this._dataService.loadChart(this.tag_id, this.fechaDesde, this.fechaHasta)
    //   .subscribe((resp: any) => {
    //     console.log('Reporte para pdf: ', resp.data);
        // return;
        const doc = new jsPDF();
        const col = [['#', 'Fecha', 'Valor','#','Fecha', 'Valor','#','Fecha', 'Valor']];
        const rows = [];
        var numcolumnas = 0;
        var fila = [];
        const symbol = this.objetoTagSeleccionado.tag_symbol;


        const totalFilas = this.reporte.length;
        const tamanoColumna = Math.floor(totalFilas / 3);
        var turnoColumna = 0;
        console.log("Total filas: ", totalFilas);
        console.log("tamaño columna: ", tamanoColumna);
        // return;
        var indice = 1;
        this.reporte.forEach(element => {
        // const temp = [element.t, element.y + ' cm'];
        fila.push(indice);
        fila.push(element.t);
        fila.push(element.y + ' ' + symbol);
        numcolumnas ++;
        indice ++;
        if (numcolumnas>2){
          numcolumnas = 0;
          rows.push(fila);
          fila = [];
        }
        });
        
        
        doc.autoTableSetDefaults({
          headStyles: {fillColor: [48, 176, 240]},
          margin: {top: 12},
          didDrawPage: function(data) {
              doc.setFontSize(10);
              doc.text(descripcion, data.settings.margin.left, 8);
          }
      });
        doc.autoTable({
          head: col,
          body: rows,
          bodyStyles:{
            fontSize:8,
            cellPadding:1,
            lineWidth: 0.1
          }
      });
      // doc.autoTable(col, rows);
      doc.save('ReportePDF.pdf');
      
      // this.pdf = false;
      // });
  }

  selectTag(event) {
    // console.log("Tag seleccionado: ", event.target.value);
    
    this.tagSeleccionado = event.target.value;
    this.objetoTagSeleccionado = this.tag_list.find(elemento => elemento.tag_id === Number(event.target.value));
    // console.log("Objeto tag: ", this.objetoTagSeleccionado);
    
  }

  convertirFecha (d, h) {
    const horas = h.getHours();
    const minutos = h.getMinutes();
    const segundos = h.getSeconds();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() +
    ' ' + horas + ':' + minutos + ':' + segundos;
  }


  buscar() {
    this.pdf = false;
    console.log("Buscando...");
    this.status = 'Generando reporte...';
    const millisDesde = new Date(this.convertirFecha(this.fd, this.hd)).getTime();
    const millisHasta = new Date(this.convertirFecha(this.fh, this.hh)).getTime();
    if (this.tagSeleccionado === '') {
      // console.log('Debe seleccionar un Tag');
      Swal.fire('Oops...', 'Debe seleccionar un Tag!', 'error');
      return;
    }
    if (millisDesde > millisHasta) {
      // console.log('Fecha desde no puede ser mayor a fecha hasta');
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
    this.tag_id = this.tagSeleccionado;
    this.fechaDesde = this.convertirFecha( this.fd, this.hd);
    this.fechaHasta = this.convertirFecha( this.fh, this.hh);
    this.repDesde = this.retornaFecha(this.fechaDesde);
    this.repHasta = this.retornaFecha(this.fechaHasta);
    // console.log('Fecha desde: ', this.fechaDesde);
    // console.log('Fecha hasta: ', this.fechaHasta);
    // console.log('Unit: ', this.unit);
    
    console.log("Desde: ", this.fechaDesde);
    
    this._dataService.loadChart(this.tag_id, this.fechaDesde, this.fechaHasta)
    .subscribe((resp: any) => {
      this.reporte = resp.data;
      console.log("Reporte: ", this.reporte);
      this.status = '';
      this.pdf = true;
      });
  }

  ngOnInit() {
    const desde = new Date();
    desde.setDate(desde.getDate());
    this.fd = desde;
    this.fh = new Date();
    this.hd = new Date();
    this.hd.setHours(0, 0, 0, 0);
    this.hh = new Date();
    this.tag_list = this._usuario.tags;
        console.log(this.tag_list);
    // return;
    // this._dataService.tagsPorCliente(1)
    //   .subscribe((resp: any) => {
    //     this.tag_list = resp.tags;
    //   });
  }


}
