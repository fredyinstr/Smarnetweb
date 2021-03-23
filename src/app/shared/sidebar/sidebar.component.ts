import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/UsuarioService';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  logo = "";

  constructor(public _usuario: UsuarioService) { }

  ngOnInit() {
    this.logo = "./assets/img/"+this._usuario.cliente.logo;
    console.log("Ruta logo: ", this.logo);
    // console.log("perfil: ", this._usuario.usuario.usuario_perfil);
    
    
  }

}
