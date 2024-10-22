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

  votar(vote: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.url + '/add_vote/' + vote)
      .map((res) => res);
  }
  getVotos() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.url + '/get_all_votes/', { headers: headers })
      .map(res => res.json());
  }
  getVotoDomain(search: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.url + '/get_by_domain/' + search)
      .map((response: Response) => {
        return response.json();
      });
  }

  login(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', user.username);
    body.set('password', user.password);
    return this._http.post('http://thevotechain.azurewebsites.net/Token', body, { headers: headers })
      .map((response: Response) => {
        return response.json();
      });
  }
}
