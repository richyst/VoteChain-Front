import { Component, OnInit } from '@angular/core';
import { ProcesandoService } from './services/procesando.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  procesando = false;
  constructor(private procesandoService: ProcesandoService) { }
  ngOnInit() {
    this.procesandoService.procesando.subscribe(
      (estado: boolean) => {
        this.procesando = estado;
      }
    );
  }
}
