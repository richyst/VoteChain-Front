import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material';
import { VotosService } from '../../services/votos.service';
import { AvisoComponent } from '../../shared/aviso/aviso.component';
import { NgForm } from '@angular/forms';

import { v4 as uuid } from 'uuid';
@Component({
  selector: 'app-votar',
  templateUrl: './votar.component.html',
  styleUrls: ['./votar.component.css']
})
export class VotarComponent implements OnInit {
  voto: any;
  usuario = {
    codigo: '1234',
    entidad: 'CDMX',
    distrito: '1',
    municipio: 'Coyoacan',
    seccion: '3',
    localidad: '23023'
  };
  candidatos = [
    {
      nombre: 'Andrés Manuél López Obrador',
      partido: 'MORENA-PES-PT'
    },
    {
      nombre: 'Ricardo Anaya Cortés',
      partido: 'PAN-PRD-MC'
    },
    {
      nombre: 'José Antonio Meade',
      partido: 'PRI-PVEM-PANAL'
    },
    {
      nombre: 'Margarita Zavala',
      partido: 'INDEPENDIENTE-ZAVA'
    },
    {
      nombre: 'Jaime Heliodoro Rodríguez Calderón',
      partido: 'INDEPENDIENTE-BRONCO'
    }
  ];
  constructor(public dialog: MatDialog, private votosService: VotosService) { }

  ngOnInit() {
  }
  onSubmit(myForm: NgForm) {
    console.log(myForm);
    let id = uuid();
    const reg = /[0-9]{1}/;
    while (!(reg.test(id.substr(0, 1)))) {
      id = uuid();
    }
    const vote = id + '_' + this.usuario.codigo + '_' + myForm.value.eleccion.partido + '_' +
    this.usuario.entidad + '_' + this.usuario.distrito + '_' + this.usuario.municipio + '_' +
    this.usuario.seccion + '_' + this.usuario.localidad;
    if (myForm.valid) {
      this.votosService.votar(vote).subscribe(
        data => {
          console.log(data);
          alert('Ya votaste perrito');
        },
        error => {
          this.openAviso(['Error', error]);
          console.log(error);
        }
      );
    }
  }
  openAviso(mensaje: Array<string>) {
    const dialog = this.dialog.open(AvisoComponent, {
      autoFocus: false,
      maxWidth: 500,
      minWidth: 500,
      data: { mensaje: mensaje }
    });
  }
}
