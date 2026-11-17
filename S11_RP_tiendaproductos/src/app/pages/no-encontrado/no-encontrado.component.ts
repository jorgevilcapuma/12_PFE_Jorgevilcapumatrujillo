import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-encontrado',
  imports: [RouterLink],
  template: `
    <div class="tarjeta caja">
      <span class="codigo">404</span>
      <h2>Página no encontrada</h2>
      <p>La ruta que buscas no existe en NovaMarket.</p>
      <a routerLink="/inicio" class="btn">Volver al inicio</a>
    </div>
  `,
  styles: `
    .caja { text-align: center; padding: 3.5rem 1.5rem; max-width: 520px; margin: 2rem auto; }
    .codigo { font-size: 4.5rem; font-weight: 800; color: var(--primario); line-height: 1; }
    h2 { margin: .5rem 0; }
    p { color: var(--texto-suave); margin-bottom: 1.5rem; }
  `
})
export class NoEncontradoComponent {}
