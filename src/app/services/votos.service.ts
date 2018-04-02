import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ProcesandoService } from './procesando.service';
import 'rxjs/add/operator/catch';
@Injectable()
export class VotosService {
  url = 'http://localhost:8000';
  constructor(private _http: Http, private procesandoService: ProcesandoService) { }

  votar(data: any) {
    const vote = data.id + '-' + data.codigo + '-' + data.eleccion + '-' + data.entidad + '-' + data.distrito
      + '-' + data.municipio + '-' + data.seccion + '-' + data.localidad;
    return this._http.get(this.url + '/add_vote/' + vote)
      .map((response: Response) => {
        return response.json();
      });
  }
  getVotos() {
    return this._http.get(this.url + '/get_all_votes/')
      .map((response: Response) => {
        return response.json();
      });
  }
  getVotoDomain(factor: any, parametro: any) {
    const search = factor + '-' + parametro;
    return this._http.get(this.url + '/get_by_domain/' + search)
      .map((response: Response) => {
        return response.json();
      });
  }
}
