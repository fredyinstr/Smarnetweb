import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-limites',
  templateUrl: './limites.component.html',
  styleUrls: ['./limites.component.css']
})
export class LimitesComponent implements OnInit {
  tags: [] = [];
  ll = '';
  lh = '';
  lul = '';
  luh = '';

  constructor( private _dataService: DataService ) { }

  valoresTag(tag) {
    console.log ('tag a buscar: ', tag.target.value);
  }

  ngOnInit() {
    this._dataService.tagsPorCliente(1)
    .subscribe( (resp: any) => {
    console.log('Respuesta tagsByClient: ', resp.tags );
    this.tags = resp.tags;
  });
  }

}
