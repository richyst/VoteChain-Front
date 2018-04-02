import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AvisoComponent } from '../../shared/aviso/aviso.component';
import { VotosService } from '../../services/votos.service';

@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.component.html',
  styleUrls: ['./analisis.component.css']
})
export class AnalisisComponent implements OnInit {
  busqueda: string;
  votes: any;
  query: any;
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
        this.openAviso(['Error', 'No se pudieron recuperar los votos']);
      }
    );
  }

  buscar() {
    console.log(this.busqueda);
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
