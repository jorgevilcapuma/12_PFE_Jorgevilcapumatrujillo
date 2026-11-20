import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../services/auth.service';

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
  private auth = inject(AuthService);

  usuario = this.auth.usuarioActual;

  iniciales(): string {
    const nombre = this.usuario()?.nombre ?? '';
    return nombre.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
  }

  cerrarSesion(): void {
    this.auth.logout();
    this.router.navigate(['/login'], { queryParams: { motivo: 'logout' } });
  }

  menu: OpcionMenu[] = [
    { ruta: '/inicio', etiqueta: 'Inicio', icono: 'inicio' },
    { ruta: '/productos', etiqueta: 'Catálogo', icono: 'productos' },
    { ruta: '/categorias', etiqueta: 'Categorías', icono: 'categorias' },
    { ruta: '/inventario', etiqueta: 'Inventario', icono: 'inventario' },
  ];

  seccionActual = signal('Inicio');
  menuAbierto = signal(false);

  constructor() {
    this.actualizarSeccion(this.router.url);
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => {
        this.actualizarSeccion(e.urlAfterRedirects);
        this.menuAbierto.set(false);
      });
  }

  private actualizarSeccion(url: string): void {
    const opcion = this.menu.find(m => url.startsWith(m.ruta));
    this.seccionActual.set(opcion?.etiqueta ?? 'Página no encontrada');
  }
}
