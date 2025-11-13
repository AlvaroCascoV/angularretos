import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DatosEquipo } from '../../models/datosEquipo';
import { ServiceFutbol } from '../../services/ServiceFutbol';

@Component({
  selector: 'app-equipo',
  standalone: false,
  templateUrl: './equipo-component.html',
  styleUrl: './equipo-component.css',
})
export class EquipoComponent implements OnInit {
  public dataequipo!: any;

  constructor(private _activateRoute: ActivatedRoute, private _service: ServiceFutbol) {}

  ngOnInit(): void {
    this._activateRoute.params.subscribe((params: Params) => {
      let idEquipo = parseInt(params['idequipo']);
      let datos: DatosEquipo;
      datos = new DatosEquipo();

      this._service.findEquipo(idEquipo).subscribe((response) => {
        response.descripcion = response.descripcion.substring(0, 250);
        datos.equipo = response;
      });

      this._service.getJugadoresEquipo(idEquipo).subscribe((response) => {
        datos.jugadores = response;
      });

      this.dataequipo = datos;
    });
  }
}
