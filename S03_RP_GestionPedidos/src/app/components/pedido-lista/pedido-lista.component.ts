import { Component, EventEmitter, Input, Output } from '@angular/core'; // <-- Debe ser @angular/core
import { NgFor, NgIf } from '@angular/common';
import { Pedido } from '../../pedido.model';
import { PedidoCardComponent } from '../pedido-card/pedido-card.component';

@Component({
  selector: 'app-pedido-lista',
  standalone: true,
  imports: [NgFor, NgIf, PedidoCardComponent],
  templateUrl: './pedido-lista.component.html',
  styleUrl: './pedido-lista.component.css'
})
export class PedidoListaComponent {
  @Input({ required: true }) pedidos: Pedido[] = [];
  @Output() editarPedido = new EventEmitter<Pedido>();
  @Output() eliminarPedido = new EventEmitter<number>();

  onEditar(pedido: Pedido): void {
    this.editarPedido.emit(pedido);
  }

  onEliminar(id: number): void {
    this.eliminarPedido.emit(id);
  }
}