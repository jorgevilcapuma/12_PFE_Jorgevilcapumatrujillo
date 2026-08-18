import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sistema de Control de Inventario';
  estudiante = 'JORGE VILCAPUMA TRUJILLO'; // Modifica esto con tu nombre completo

  insumos = [
    {
      nombre: 'Hojas A4 (Resma)',
      categoria: 'Papelería',
      stock: 45,
      estado: 'Disponible',
      almacen: 'Almacén Central'
    },
    {
      nombre: 'Tóner Impresora HP',
      categoria: 'Tecnología',
      stock: 3,
      estado: 'Stock Crítico',
      almacen: 'Almacén B'
    },
    {
      nombre: 'Cajas de Cartón Mediana',
      categoria: 'Empaque',
      stock: 120,
      estado: 'Disponible',
      almacen: 'Almacén Central'
    }
  ];

  // Métricas calculadas para la tarjeta resumen
  get totalInsumos() {
    return this.insumos.length;
  }

  get insumosCriticos() {
    return this.insumos.filter(item => item.stock < 5).length;
  }

  // --- FUNCIONES PARA LOS BOTONES INTERACTIVOS ---
  registrarInsumo() {
    alert('Abriendo formulario para registrar un nuevo insumo.');
  }

  verDetalles(nombreInsumo: string) {
    alert(`Mostrando detalles para: ${nombreInsumo}`);
  }
}