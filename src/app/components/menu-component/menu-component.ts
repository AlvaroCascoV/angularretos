import { Component } from '@angular/core';
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

  constructor(public serviceFutbol: ServiceFutbol) {
    this.serviceFutbol.getEquipos().subscribe((response) => {
      this.equipos = response;
    });
  }
}
