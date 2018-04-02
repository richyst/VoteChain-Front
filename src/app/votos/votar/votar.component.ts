import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material';
import { VotosService } from '../../services/votos.service';
import { AvisoComponent } from '../../shared/aviso/aviso.component';
import { NgForm } from '@angular/forms';

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
    municipio: 'Coyoacán',
    seccion: '3',
    localidad: '23023'
  };
  candidatos = [
    {
      nombre: 'Andrés Manuél López Obrador',
      partido: 'MORENA-PES-PT'
    },
    {
      nombre: 'José Antonio Meade',
      partido: 'PRI-PVEM-PANAL'
    },
    {
      nombre: 'Ricardo Anaya Cortés',
      partido: 'PAN-PRD-MC'
    },
    {
      nombre: 'Margarita Zavala',
      partido: 'INDEPENDIETE'
    }
  ];
  constructor(public dialog: MatDialog, private votosService: VotosService) { }

  ngOnInit() {
  }
  onSubmit(myForm: NgForm) {
    const build = '1' + '-' + this.usuario.codigo + '-' + this.voto.nombre + '-' + this.usuario.entidad
    + '-' + this.usuario.distrito + '-' + this.usuario.municipio + '-' + this.usuario.seccion + '-' + this.usuario.localidad;
    if (myForm.valid) {
      this.votosService.votar(build).subscribe(
        data => {
          console.log(data);
        },
        error => {
          this.openAviso(['Error', 'No se pudo votar']);
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
