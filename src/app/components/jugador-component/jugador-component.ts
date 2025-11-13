import { Component, OnInit } from '@angular/core';
import { Jugador } from '../../models/jugador';
import { ServiceFutbol } from '../../services/ServiceFutbol';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jugador-component',
  standalone: false,
  templateUrl: './jugador-component.html',
  styleUrls: ['./jugador-component.css'],
})
export class JugadorComponent implements OnInit {
  jugadores: Jugador[] = [];

  constructor(private serviceFutbol: ServiceFutbol, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const busqueda = this.route.snapshot.queryParamMap.get('busqueda');
    if (busqueda && String(busqueda).trim()) {
      this.search(String(busqueda));
    }
  }

  search(term: string) {
    const q = (term ?? '').trim();
    if (!q) {
      this.jugadores = [];
      return;
    }
    this.serviceFutbol.searchJugadores(q).subscribe((players: Jugador[]) => {
      this.jugadores = players || [];
    });
  }

  trackById(index: number, item: Jugador) {
    return item && item.idJugador ? item.idJugador : index;
  }
}
