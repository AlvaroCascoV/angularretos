import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { Jugador } from '../models/jugador';
import { Equipo } from '../models/equipo';

@Injectable()
export class ServiceFutbol {
  constructor(private _http: HttpClient) {}

  // Search term Subject and public stream of search results.
  private _search$ = new Subject<string>();

  // Public observable components can subscribe to. It debounces input,
  // ignores duplicates and switches to the latest HTTP request.
  jugadores$: Observable<Array<Jugador>> = this._search$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    switchMap((term) => {
      if (!term || !term.trim()) return of([]);
      const request = 'api/Jugadores/BuscarJugadores/' + encodeURIComponent(term);
      const url = environment.urlApiFutbol + request;
      return this._http.get<Array<Jugador>>(url).pipe(catchError(() => of([])));
    })
  );

  // Trigger a search (components call this).
  search(term: string) {
    this._search$.next(term);
  }

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

  // Search players by a free-text term. Backend endpoint (example):
  // GET {base}/api/Jugadores/BuscarJugadores/{term}
  // Use this exact path to match the API example provided.
  searchJugadores(term: string): Observable<Array<Jugador>> {
    const request = 'api/Jugadores/BuscarJugadores/' + encodeURIComponent(term);
    const url = environment.urlApiFutbol + request;
    return this._http.get<Array<Jugador>>(url);
  }
}
