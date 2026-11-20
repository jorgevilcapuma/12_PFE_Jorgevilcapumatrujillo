import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CATEGORIAS, MOVIMIENTOS, PRODUCTOS, estadoStock, nombreCategoria } from '../../data/tienda.data';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  productos = PRODUCTOS;
  categorias = CATEGORIAS;

  totalProductos = PRODUCTOS.length;
  totalCategorias = CATEGORIAS.length;
  unidadesStock = PRODUCTOS.reduce((s, p) => s + p.stock, 0);
  valorInventario = PRODUCTOS.reduce((s, p) => s + p.precio * p.stock, 0);

  alertas = PRODUCTOS.filter(p => estadoStock(p) !== 'Disponible');
  ofertas = PRODUCTOS.filter(p => p.precioAnterior);
  movimientos = MOVIMIENTOS.slice(0, 4);

  estado = estadoStock;
  categoria = nombreCategoria;

  nombreProducto(id: number): string {
    return PRODUCTOS.find(p => p.id === id)?.nombre ?? '';
  }

  productosPorCategoria(id: number): number {
    return PRODUCTOS.filter(p => p.categoriaId === id).length;
  }
}
