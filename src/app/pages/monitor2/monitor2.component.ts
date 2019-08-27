import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-monitor2',
  templateUrl: './monitor2.component.html',
  styleUrls: ['./monitor2.component.css']
})
export class Monitor2Component implements OnInit {

  tags: any [] = [];

  constructor( private _dataService: DataService, private router: Router ) { }

  monitor() {
    this.router.navigate(['monitor']);
  }

  ngOnInit() {
    this._dataService.tagsPorCliente(2)
      .subscribe((resp: any) => {
        console.log('Tags por cliente: ', resp.tags);
        this.tags = resp.tags;
      });
  }

}
