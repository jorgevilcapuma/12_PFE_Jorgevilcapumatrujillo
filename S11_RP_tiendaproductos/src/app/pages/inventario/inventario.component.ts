import { Component, computed, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MOVIMIENTOS, PRODUCTOS, EstadoStock, Producto, estadoStock, nombreCategoria } from '../../data/tienda.data';

@Component({
  selector: 'app-inventario',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent {
  estado = estadoStock;
  categoria = nombreCategoria;
  movimientos = MOVIMIENTOS;

  filtros: (EstadoStock | 'Todos')[] = ['Todos', 'Disponible', 'Stock bajo', 'Agotado'];
  filtro = signal<EstadoStock | 'Todos'>('Todos');

  lista = computed(() =>
    PRODUCTOS.filter(p => this.filtro() === 'Todos' || estadoStock(p) === this.filtro())
  );

  contar(e: EstadoStock): number {
    return PRODUCTOS.filter(p => estadoStock(p) === e).length;
  }

  porcentaje(p: Producto): number {
    // Nivel de stock respecto al doble del mínimo (100 % = nivel cómodo)
    return Math.min(100, (p.stock / (p.stockMinimo * 2)) * 100);
  }

  nombreProducto(id: number): string {
    return PRODUCTOS.find(p => p.id === id)?.nombre ?? '';
  }
}
