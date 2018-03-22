import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ProcesandoService {
  procesando = new EventEmitter<boolean>();
  constructor() { }

  startProcessing() {
    this.procesando.emit(true);
  }
  stopProcessing() {
    this.procesando.emit(false);
  }
}
