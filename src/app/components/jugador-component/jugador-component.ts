import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  @Input() jugadores: Jugador[] = [];

  jugadores$: Observable<Jugador[]>;

  constructor(private serviceFutbol: ServiceFutbol, private route: ActivatedRoute) {
    this.jugadores$ = this.serviceFutbol.jugadores$;
  }

  ngOnInit(): void {
    const busqueda =
      this.route.snapshot.queryParamMap.get('busqueda') ||
      this.route.snapshot.queryParamMap.get('term');
    if (busqueda && String(busqueda).trim()) {
      this.serviceFutbol.search(String(busqueda));
    }
  }
}
