import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Jugador } from '../../models/jugador';
import { ServiceFutbol } from '../../services/ServiceFutbol';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jugador-component',
  standalone: false,
  templateUrl: './jugador-component.html',
  styleUrls: ['./jugador-component.css'],
})
export class JugadorComponent implements OnInit, OnDestroy {
  @Input() jugadores: Jugador[] = [];

  private _sub?: Subscription;

  constructor(private serviceFutbol: ServiceFutbol, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this._sub = this.serviceFutbol.jugadores$.subscribe({
      next: (res) => (this.jugadores = res),
      error: () => (this.jugadores = []),
    });

    this.route.queryParams.subscribe((qp) => {
      const q = qp['q'] || qp['term'];
      if (q && String(q).trim()) {
        this.serviceFutbol.search(String(q));
      }
    });
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }

  formatFecha(fecha?: string): string {
    if (!fecha) return '—';
    const d = new Date(fecha);
    if (isNaN(d.getTime())) return fecha;
    return d.toLocaleDateString();
  }

  trackByJugador(_i: number, j: Jugador) {
    return j.idJugador;
  }
}
