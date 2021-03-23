import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import Swal from 'sweetalert2'; // https://www.npmjs.com/package/sweetalert2
import { UsuarioService } from 'src/app/services/UsuarioService';


@Component({
  selector: 'app-limites',
  templateUrl: './limites.component.html',
  styleUrls: ['./limites.component.css']
})
export class LimitesComponent implements OnInit {
  tags: any [] = [];
  ll = '0';
  lh = '0';
  lul = '';
  luh = '';
  symbol = '';
  tag_id = null;
  tiemponot = null;
  nombreTag = '';

  constructor( private _dataService: DataService, public _usuario: UsuarioService ) { }

  sonValidos() {
    // console.log('lh: ', this.lh);

      if ((this.lh == null )) {
        Swal.fire('ERROR', 'Valor no válido!', 'warning');
        return false;
      }
      if ((this.ll == null )) {
        Swal.fire('ERROR', 'Valor no válido!', 'warning');
        return false;
      }
      if (isNaN(Number(this.lh))) {
        Swal.fire('ERROR', 'Valor no válido!', 'warning');
        return false;
      }
        if (isNaN(Number(this.ll))) {
          Swal.fire('ERROR', 'Valor no válido!', 'warning');
          return false;
      }
      if (Number(this.ll) >= Number(this.lh)) {
        Swal.fire( 'ERROR', 'Límite alto debe ser mayor al límite bajo', 'warning');
        return false;
      }
      return true;
  }

  valoresTag(tag) {
    // console.log ('tag a buscar: ', tag.target.value);
    this.tag_id = tag.target.value;
    this._dataService.limitesTag( this.tag_id )
      .subscribe( (resp: any) => {
        console.log('Limites: ', resp);
        this.ll = resp.limites.limite_bajo;
        this.lh = resp.limites.limite_alto;
        this.symbol = resp.limites.tag_symbol;
        this.tiemponot = Number(resp.limites.tiemponot);
        this.nombreTag = resp.limites.tag_descripcion;
        // console.log('tt: ', this.tiemponot);
      });
  }

  seleccionTiempo(tiempo) {
    this.tiemponot = tiempo.target.value;
    // console.log('Tiempo not: ', this.tiemponot);
  }

  guardarLimites() {
    if (this.sonValidos()) {
      // console.log('guardando...');
      this._dataService.updateLimitesTag( this.tag_id, this.ll, this.lh, this.tiemponot, this.nombreTag )
      .subscribe( (resp: any) => {
        // console.log('respuesta guardar limites: ', resp );
        Swal.fire('OK', resp.respuesta, 'success');
      });
    }
}

  ngOnInit() {
  //   this._dataService.tagsPorCliente(2)
  //   .subscribe( (resp: any) => {
  //   console.log('Respuesta tagsByClient: ', resp.tags );
  //   this.tags = resp.tags;
  // });
  this.tags = this._usuario.tags;
  }

}
