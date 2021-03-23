import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/UsuarioService';


@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})

export class MonitorComponent implements OnInit {
  tag_id = '29';

  tags: any [] = [];

  options = {
    title: ''
  };
  max = 100;
  value = 0;

   // lineChart

    public lineChartLegend = true;
    public lineChartType = 'line';
    public lineChartData: Array<any> = [
    {
      data: [
      {x: 0, y: 0},
      {x: 5, y: 12},
      {x: 10, y: 1},
      {x: 15, y: 6},
      {x: 20, y: 18},
      {x: 25, y: 4},
      {x: 30, y: 25}
    ]}
  ];


  public lineChartOptions: any = {
    scales: {
            xAxes: [{
              time: {
                unit: 'minute'
                },
                type: 'time',
                distribution: 'series',
                position: 'bottom'
            }],
            yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
        },
        responsive: true,
        animation: false,
        legend: {
            display: false
          },
          elements: {
            line: {
              fill: false,
              tension: false
            },
          }

  };

  constructor( private _dataService: DataService,
              private router: Router, private _usuario: UsuarioService) { }

  monitor2() {
    this.router.navigate(['monitor2']);
  }

  hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null,
      str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
    );
}

  ngOnInit() {
    console.log("Iniciando monitor...");
    
    // this._dataService.tagsPorCliente(2)
    //   .subscribe((resp: any) => {
    //     console.log('Tags por cliente: ', resp.tags);
    //     this.tags = resp.tags;
    //   });

    if (this._usuario.tags.length === 0)
        this.router.navigate(['login']);
    this.tags = this._usuario.tags;
    console.log("tags: ", this.tags);
    console.log("Cadena ecoded: ", this.hexToBase64("030101"));
    console.log("Cadena ecoded: ", this.hexToBase64("030000"));
    console.log("Cadena ecoded: ", this.hexToBase64("030001"));
    
    


      // console.log("Token: ", this._usuario.token);
      // console.log("cliente: ", this._usuario.cliente);
      // console.log("tags: ", this._usuario.tags);
      // console.log("perfil: ", this._usuario.usuario.usuario_perfil);
  }

  
  

}
