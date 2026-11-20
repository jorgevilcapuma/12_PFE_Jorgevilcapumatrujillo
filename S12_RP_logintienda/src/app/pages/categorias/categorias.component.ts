import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CATEGORIAS, PRODUCTOS, Categoria } from '../../data/tienda.data';

interface ResumenCategoria extends Categoria {
  cantidad: number;
  unidades: number;
  precioMin: number;
  precioMax: number;
}

@Component({
  selector: 'app-categorias',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {
  resumen: ResumenCategoria[] = CATEGORIAS.map(c => {
    const items = PRODUCTOS.filter(p => p.categoriaId === c.id);
    const precios = items.map(p => p.precio);
    return {
      ...c,
      cantidad: items.length,
      unidades: items.reduce((s, p) => s + p.stock, 0),
      precioMin: precios.length ? Math.min(...precios) : 0,
      precioMax: precios.length ? Math.max(...precios) : 0,
    };
  });
}
