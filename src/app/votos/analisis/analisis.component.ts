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
  votes = [];
  partidos = [];
  conteos = [];
  query: any;
  graf = [];
  elecciones = [
    'Eleccion',
    'Codigo',
    'Entidad',
    'Distrito',
    'Municipio',
    'Seccion',
    'Localidad'
  ];
  single = [
    {
      'name': 'Germany',
      'value': 8940000
    },
    {
      'name': 'USA',
      'value': 5000000
    },
    {
      'name': 'France',
      'value': 7200000
    }
  ];

  view: any[] = [700, 400];

  gradient = false;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  // line, area
  autoScale = true;
  constructor(public dialog: MatDialog, private votosService: VotosService) { }
  onSelect(event) {
    console.log(event);
  }
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
  limpiar() {
    this.partidos = [];
    this.conteos = [];
    this.partidos.push(this.votes[0].Record.eleccion);
    for (let i = 0; i < this.partidos.length; i++) {
      for (let j = 0; j < this.votes.length; j++) {
        let check = false;
        if (this.votes[j].Record.eleccion === this.partidos[i]) {
          check = true;
        }
        if (!check && ((this.votes.length - 1) === i)) {
          this.partidos.push(this.votes[j].Record.eleccion);
        }
      }
    }
    for (let i = 0; i < this.partidos.length; i++) {
      for (let j = 0; j < this.votes.length; j++) {
        if (this.votes[j].Record.eleccion === this.partidos[i]) {
          this.conteos[i]++;
        }
      }
    }
    this.graf = [];
    for (let i = 0; i < this.partidos.length; i++) {
      this.graf[i] = {name: this.partidos[i], value: this.conteos[i]};
    }
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
