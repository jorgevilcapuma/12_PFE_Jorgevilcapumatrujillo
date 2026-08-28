import { Component, signal } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PedidoFormularioComponent } from './components/pedido-formulario/pedido-formulario.component';
import { PedidoListaComponent } from './components/pedido-lista/pedido-lista.component';
import { Pedido } from './pedido.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, PedidoFormularioComponent, PedidoListaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  pedidos = signal<Pedido[]>([
    { id: 1, cliente: 'Ana Gómez', producto: 'Laptop Dell XPS 13', cantidad: 1, precioTotal: 1200, estado: 'Completado' },
    { id: 2, cliente: 'Carlos López', producto: 'Monitor LG 27"', cantidad: 2, precioTotal: 600, estado: 'Procesando' },
    { id: 3, cliente: 'María Rodríguez', producto: 'Teclado Mecánico RGB', cantidad: 1, precioTotal: 150, estado: 'Pendiente' },
    { id: 4, cliente: 'Juan Pérez', producto: 'Mouse Inalámbrico', cantidad: 3, precioTotal: 90, estado: 'Completado' },
    { id: 5, cliente: 'Lucía Fernández', producto: 'Silla Ergonómica', cantidad: 1, precioTotal: 250, estado: 'Cancelado' }
  ]);

  pedidoSeleccionado: Pedido | null = null;

  guardarPedido(pedido: Omit<Pedido, 'id'> | Pedido): void {
    if ('id' in pedido) {
      this.pedidos.update(lista =>
        lista.map(p => (p.id === pedido.id ? (pedido as Pedido) : p))
      );
    } else {
      const listaActual = this.pedidos();
      const nuevoId = listaActual.length > 0 ? Math.max(...listaActual.map(p => p.id)) + 1 : 1;
      this.pedidos.set([...listaActual, { id: nuevoId, ...pedido }]);
    }
    this.pedidoSeleccionado = null;
  }

  seleccionarParaEditar(pedido: Pedido): void {
    this.pedidoSeleccionado = { ...pedido };
  }

  eliminarPedido(id: number): void {
    this.pedidos.update(lista => lista.filter(p => p.id !== id));
    if (this.pedidoSeleccionado?.id === id) {
      this.pedidoSeleccionado = null;
    }
  }

  cancelarEdicion(): void {
    this.pedidoSeleccionado = null;
  }
}