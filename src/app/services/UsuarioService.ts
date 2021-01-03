import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, URL_API } from '../config/config';
// import { Usuario } from '../models/usuario.model';
import { map } from 'rxjs/operators';
// import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})

export class UsuarioService {
    usuario: any;
    token: string;
    id: string;
    tags = [];
    cliente:any;

    constructor(public http: HttpClient) {
        this.cargarStorage();
        console.log('Servicio de usuario listo!', this.tags );
    }

    estaLogueado() {
        return (this.token.length > 5) ? true : false;
    }

    guardarStorage() {
        // localStorage.setItem('id', this.id);
        localStorage.setItem('token', this.token);
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
        localStorage.setItem('tags', JSON.stringify(this.tags));
        localStorage.setItem('cliente', JSON.stringify(this.cliente));
    }

    clearStorage() {
        this.usuario = null;
        this.token = '';
        this.tags = [];
        this.id= "";
        this.cliente = null;
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        localStorage.removeItem('tags');
        localStorage.removeItem('cliente');
        
    }

    cargarStorage() {
        if (localStorage.getItem('token')) {
            this.usuario = JSON.parse(localStorage.getItem('usuario'));
            this.token = localStorage.getItem('token');
            this.tags = JSON.parse(localStorage.getItem('tags'));
            this.cliente = JSON.parse(localStorage.getItem('cliente'));
        } else {
            this.token = '';
            this.usuario = null;
            this.tags = null;
            this.cliente = null;
        }
    }

    logout() {
        this.clearStorage();
    }

    login(user:any, pass:any, ensesion:any = 1) {
        // console.log("autenticando: "+ensesion);
        // console.log("usuario: "+user);
        // console.log("clave: "+pass);
        let parametros = {"usuario":user, "password":pass, "ensesion":ensesion};
        let url = URL_API + "login";

        return this.http.post(url, parametros).pipe(
            map((resp:any)=>{
                this.token = resp.token;
                this.usuario = resp.usuario;
                this.cliente = resp.cliente;
                this.tags = resp.tags;
                console.log("Respuesta login: ", resp);
                
                // this.usuario = resp.usuario;
                // this.id = resp.usuario_id;
                this.guardarStorage();
                return true;
            })
        )
            
      }
    
      crear_cuenta(nombre:any, user:any, pass:any, mail:any){
        // console.log("Creando cuenta");
    
        let url = URL_SERVICIOS + "iotlogin/crearcuenta";
        let data = new URLSearchParams();
        data.append('usuario', user);
        data.append('password', pass);
        data.append('nombre', nombre);
        data.append('correo', mail);
        return this.http.post(url, data);    
      }

      verUsuario(id) {
        let url = URL_API + "usuario/"+id;
        return this.http.get(url).pipe(
            map((resp:any)=>{
                return resp.usuarios;
            })
        )
      }
      usuariosCliente() {
        let url = URL_API + "usuario";
        return this.http.get(url).pipe(
            map((resp:any)=>{
                return resp.usuarios;
            })
        )
      }

      actualizarUsuario(id, nombres, apellidos, mail, user, pass) {
        let url = URL_API + "usuario/"+id;
        url += "?token=" + this.token;
        // let data = new URLSearchParams();
        // data.append('user', user);
        // data.append('pass', pass);
        // data.append('nombres', nombres);
        // data.append('apellidos', apellidos);
        // data.append('mail', mail);
        let body = {
            nombres: nombres,
            apellidos: apellidos,
            user: user,
            pass: pass,
            mail: mail
        }
        return this.http.put(url, body);
      }
}
