import { Equipo } from './equipo';
import { Jugador } from './jugador';

export class DatosEquipo {
  public equipo!: Equipo;
  public jugadores!: Array<Jugador>;
  constructor() {}
}
