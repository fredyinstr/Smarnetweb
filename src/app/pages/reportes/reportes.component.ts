import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  tag_id;
  tag_list = [];

  constructor( private _dataService: DataService) { }

  traerReporte(event) {
    console.log('Trayendo reporte...', event.target.value);
    this.tag_id = event.target.value;
  }

  ngOnInit() {
    this._dataService.tagsPorCliente(1)
      .subscribe((resp: any) => {
        console.log(resp);
        this.tag_list = resp.tags;
        this.tag_id = resp.tags[0].tag_id;
      });
  }


}
