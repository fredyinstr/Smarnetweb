import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/UsuarioService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios = [
    {
      nombres:'Sin definir',
      apellidos: 'Sin definir',
      correo: 'Sin definir',
      usuario: 'Sin definir',
      contrasena: ''
    },
    {
      nombres:'Sin definir',
      apellidos: 'Sin definir',
      correo: 'Sin definir',
      usuario: 'Sin definir',
      contrasena: ''
    },
    {
      nombres:'Sin definir',
      apellidos: 'Sin definir',
      correo: 'Sin definir',
      usuario: 'Sin definir',
      contrasena: ''
    },
    {
      nombres:'Sin definir',
      apellidos: 'Sin definir',
      correo: 'Sin definir',
      usuario: 'Sin definir',
      contrasena: ''
    },
    {
      nombres:'Sin definir',
      apellidos: 'Sin definir',
      correo: 'Sin definir',
      usuario: 'Sin definir',
      contrasena: ''
    },
    {
      nombres:'Sin definir',
      apellidos: 'Sin definir',
      correo: 'Sin definir',
      usuario: 'Sin definir',
      contrasena: ''
    },
  ]

  constructor(private _usuario: UsuarioService) { }

  actualizarUsuario(index, id) {
    const nombres = this.usuarios[index].nombres;
    const apellidos = this.usuarios[index].apellidos;
    const mail = this.usuarios[index].correo;
    const user = this.usuarios[index].usuario;
    const pass = this.usuarios[index].contrasena;

    // console.log("Estos usuarios: ", this.usuarios);
    // console.log("nombres: ", nombres);
    // console.log("apellidos: ", apellidos);
    // console.log("mail: ", mail);
    // console.log("user: ", user);
    // console.log("pass: ", pass);
    // return;
    this._usuario.actualizarUsuario(id,nombres, apellidos, mail, user, pass )
      .subscribe((actualizado)=>{
        Swal.fire("OK", "Usuario actualizado con éxito", "success");
      })
  }

  ngOnInit() {
    this._usuario.usuariosCliente()
      .subscribe((usuarios)=> {
        // console.log("USUARIOS EMCARTAGO: ", usuarios); 
        for (var i=0; i < usuarios.length; i++) {
          this.usuarios[i].nombres=usuarios[i].usuario_nombres;
          this.usuarios[i].apellidos=usuarios[i].usuario_apellidos;
          this.usuarios[i].correo=usuarios[i].usuario_mail;
          this.usuarios[i].usuario=usuarios[i].usuario_user;
          this.usuarios[i].contrasena=usuarios[i].usuario_pass;
        }

        // console.log("USUARIOS EN VARIABLE: ", this.usuarios);
        

      })
  }

}
