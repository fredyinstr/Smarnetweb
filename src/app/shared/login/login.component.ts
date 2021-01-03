import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/UsuarioService';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame = false;
  email: string;
  user: string;

  constructor(public router: Router, private _usuario: UsuarioService) { }

  ngOnInit() {
    let storageUser = localStorage.getItem( 'usuario' ) || '';
    // this.user = localStorage.getItem( 'usuario' ) || '';
    if (storageUser.length > 2 ) {
      this.user = JSON.parse(storageUser).usuario_user;
      this.recuerdame = true;
    }
  }

  ingresar ( forma: NgForm ) {
    // this.router.navigate(['/monitor']); 
    if ( forma.invalid ) {
      return;
    }
    // console.log('Formulario: ', forma.value );
    this._usuario.login( forma.value.user, forma.value.password)
          .subscribe( (resp) => {
            // console.log("Respuesta login subscribe: ", resp);
            
            this.router.navigate(['/monitor']);
          }, (error)=>Swal.fire("Error", "Credenciales inválidas", "error"));
  }

}