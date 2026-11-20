import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { PRODUCTOS, Producto, estadoStock, nombreCategoria } from '../../data/tienda.data';

@Component({
  selector: 'app-producto-detalle',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.css'
})
export class ProductoDetalleComponent {
  private route = inject(ActivatedRoute);

  // Lee el parámetro de ruta :id
  producto = toSignal(
    this.route.paramMap.pipe(
      map(params => PRODUCTOS.find(p => p.id === Number(params.get('id'))))
    )
  );

  estado = estadoStock;
  categoria = nombreCategoria;

  descuento(p: Producto): number {
    return p.precioAnterior ? Math.round((1 - p.precio / p.precioAnterior) * 100) : 0;
  }

  relacionados(p: Producto): Producto[] {
    return PRODUCTOS.filter(x => x.categoriaId === p.categoriaId && x.id !== p.id).slice(0, 3);
  }
}
