import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Jugador } from '../models/jugador';
import { Equipo } from '../models/equipo';

@Injectable()
export class ServiceFutbol {
  constructor(private _http: HttpClient) {}

  getJugadoresEquipo(idEquipo: number): Observable<Array<Jugador>> {
    let request = 'api/jugadores/jugadoresequipos/' + idEquipo;

    let url = environment.urlApiFutbol + request;

    return this._http.get<Array<Jugador>>(url);
  }

  findEquipo(idEquipo: number): Observable<Equipo> {
    let request = 'api/equipos/' + idEquipo;

    let url = environment.urlApiFutbol + request;

    return this._http.get<Equipo>(url);
  }

  getEquipos(): Observable<Array<Equipo>> {
    let request = 'api/equipos';

    let url = environment.urlApiFutbol + request;

    return this._http.get<Array<Equipo>>(url);
  }
}
