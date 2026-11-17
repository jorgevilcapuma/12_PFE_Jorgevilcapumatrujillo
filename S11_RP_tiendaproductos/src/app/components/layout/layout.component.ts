import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

interface OpcionMenu {
  ruta: string;
  etiqueta: string;
  icono: 'inicio' | 'productos' | 'categorias' | 'inventario';
}

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  private router = inject(Router);

  menu: OpcionMenu[] = [
    { ruta: '/inicio', etiqueta: 'Inicio', icono: 'inicio' },
    { ruta: '/productos', etiqueta: 'Catálogo', icono: 'productos' },
    { ruta: '/categorias', etiqueta: 'Categorías', icono: 'categorias' },
    { ruta: '/inventario', etiqueta: 'Inventario', icono: 'inventario' },
  ];

  seccionActual = signal('Inicio');
  menuAbierto = signal(false);

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => {
        const opcion = this.menu.find(m => e.urlAfterRedirects.startsWith(m.ruta));
        this.seccionActual.set(opcion?.etiqueta ?? 'Página no encontrada');
        this.menuAbierto.set(false);
      });
  }
}
