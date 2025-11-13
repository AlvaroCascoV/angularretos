import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DatosEquipo } from '../../models/datosEquipo';
import { ServiceFutbol } from '../../services/ServiceFutbol';
import { forkJoin } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Equipo } from '../../models/equipo';
import { Jugador } from '../../models/jugador';

@Component({
  selector: 'app-equipo',
  standalone: false,
  templateUrl: './equipo-component.html',
  styleUrl: './equipo-component.css',
})
export class EquipoComponent implements OnInit {
  public dataequipo!: DatosEquipo | any;

  public equipo?: Equipo;
  public jugadores?: Array<Jugador>;

  public equipos?: Array<Equipo>;

  constructor(private _activateRoute: ActivatedRoute, private _service: ServiceFutbol) {}

  ngOnInit(): void {
    this._activateRoute.params.subscribe((params: Params) => {
      let idEquipo = parseInt(params['idequipo']);
      let datos: DatosEquipo = new DatosEquipo();

      forkJoin({
        equipoReq: this._service.findEquipo(idEquipo),
        // add artificial delay so loading can be seen in the UI
        jugadoresReq: this._service.getJugadoresEquipo(idEquipo).pipe(delay(2000)),
      }).subscribe(({ equipoReq, jugadoresReq }) => {
        if (equipoReq && equipoReq.descripcion) {
          equipoReq.descripcion = equipoReq.descripcion.substring(0, 250);
        }

        datos.equipo = equipoReq;
        datos.jugadores = jugadoresReq;

        this.equipo = equipoReq;
        this.jugadores = jugadoresReq;

        this.dataequipo = datos;
      });

      this._service.getEquipos().subscribe((response) => {
        this.equipos = response;
      });
    });
  }
}
