import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AvisoComponent } from '../../shared/aviso/aviso.component';
import { VotosService } from '../../services/votos.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.component.html',
  styleUrls: ['./analisis.component.css']
})
export class AnalisisComponent implements OnInit {
  votes: any;
  query: any;
  elecciones = [
    'Eleccion',
    'Codigo',
    'Entidad',
    'Distrito',
    'Municipio',
    'Seccion',
    'Localidad'
  ]
  constructor(public dialog: MatDialog, private votosService: VotosService) { }

  ngOnInit() {
    this.getAllVotes();
  }

  getAllVotes() {
    this.votosService.getVotos().subscribe(
      data => {
        console.log(data);
        this.votes = data;
      },
      error => {
        this.openAviso(['Error', error]);
        console.log(error);

      }
    );
  }

  buscar(form: NgForm) {
    console.log(form);
    const search = form.value.seleccion.toLowerCase() + '-' + form.value.busqueda;
    console.log(search);
    this.votosService.getVotoDomain(search).subscribe(
      data => {
        console.log(data);
        this.query = data;
      },
      error => {
        this.openAviso(['Error', error]);
      }
    );
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
