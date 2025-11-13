import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceFutbol } from '../../services/ServiceFutbol';
import { Equipo } from '../../models/equipo';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu-component.html',
  styleUrl: './menu-component.css',
})
export class MenuComponent {
  public equipos: Equipo[] = [];
  public searchText: string = '';

  constructor(public serviceFutbol: ServiceFutbol, private router: Router) {
    this.serviceFutbol.getEquipos().subscribe((response) => {
      this.equipos = response;
    });
  }

  onSearch() {
    const trimmed = this.searchText?.trim();
    if (trimmed) {
      this.serviceFutbol.searchJugadores(trimmed);
      this.router.navigate(['/buscar'], { queryParams: { busqueda: trimmed } });
    }
  }
}
