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
  conteos = [];
  conteosQuery = [];
  query: any;
  graf = [];
  grafQuery = [];
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

  view: any[] = [ 1100, 400];

  gradient = false;
  colorScheme = {
    domain: ['#b03d27', '#C7B42C', '#A10A28', '#4286f4','#b03df4' ]
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
        this.limpiar();
      },
      error => {
        this.openAviso(['Error', error]);
        console.log(error);

      }
    );
  }
  limpiar() {
    this.conteos = [0,0,0,0,0,0,0,0,0,0];
    
    for (let i = 0; i < this.candidatos.length; i++) {
      for (let j = 0; j < this.votes.length; j++) {
        if (this.votes[j].Record.eleccion === this.candidatos[i].partido) {
          this.conteos[i]+= 1;
        }
      }
    }
    this.graf = [];
    for (let i = 0; i < this.candidatos.length; i++) {
      this.graf[i] = {name: this.candidatos[i].partido, value: this.conteos[i]};
    }
  }
  limpiarQuery() {
    this.conteosQuery = [0,0,0,0,0,0,0,0,0,0];

    for (let i = 0; i < this.candidatos.length; i++) {
      for (let j = 0; j < this.votes.length; j++) {
        if (this.votes[j].Record.eleccion === this.candidatos[i].partido) {
          this.conteosQuery[i]+= 1;
        }
      }
    }
    this.grafQuery = [];
    for (let i = 0; i < this.candidatos.length; i++) {
      this.grafQuery[i] = {name: this.candidatos[i].partido, value: this.conteosQuery[i]};
    }
  }

  buscar(form: NgForm) {
    console.log(form);
    const search = form.value.seleccion.toLowerCase() + '_' + form.value.busqueda;
    console.log(search);
    this.votosService.getVotoDomain(search).subscribe(
      data => {
        console.log(data);
        this.query = data;
        this.limpiarQuery();
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
