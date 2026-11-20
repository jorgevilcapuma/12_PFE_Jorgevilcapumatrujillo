import { Component, computed, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CATEGORIAS, PRODUCTOS, estadoStock, nombreCategoria } from '../../data/tienda.data';

@Component({
  selector: 'app-productos',
  imports: [RouterLink, CurrencyPipe, FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  categorias = CATEGORIAS;
  estado = estadoStock;
  categoria = nombreCategoria;

  busqueda = signal('');
  categoriaFiltro = signal(0);
  orden = signal<'nombre' | 'precio-asc' | 'precio-desc'>('nombre');

  constructor(route: ActivatedRoute) {
    // Permite llegar filtrado desde Categorías: /productos?categoria=2
    const cat = Number(route.snapshot.queryParamMap.get('categoria'));
    if (cat) this.categoriaFiltro.set(cat);
  }

  productos = computed(() => {
    const texto = this.busqueda().toLowerCase().trim();
    const cat = Number(this.categoriaFiltro());
    const lista = PRODUCTOS.filter(p =>
      (!cat || p.categoriaId === cat) &&
      (!texto || p.nombre.toLowerCase().includes(texto) || p.sku.toLowerCase().includes(texto) || p.marca.toLowerCase().includes(texto))
    );
    switch (this.orden()) {
      case 'precio-asc': return [...lista].sort((a, b) => a.precio - b.precio);
      case 'precio-desc': return [...lista].sort((a, b) => b.precio - a.precio);
      default: return [...lista].sort((a, b) => a.nombre.localeCompare(b.nombre));
    }
  });

  limpiar(): void {
    this.busqueda.set('');
    this.categoriaFiltro.set(0);
    this.orden.set('nombre');
  }
}
