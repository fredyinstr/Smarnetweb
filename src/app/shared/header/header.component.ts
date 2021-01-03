import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/UsuarioService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private _usuario:UsuarioService, public _router:Router) { }

  salir() {
    this._usuario.logout();
    this._router.navigate(['login']);
  }

  ngOnInit() {
  }

}
