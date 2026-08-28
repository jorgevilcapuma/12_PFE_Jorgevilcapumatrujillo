import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, LowerCasePipe, CurrencyPipe } from '@angular/common'; // <-- Importar NgClass aquí
import { Pedido } from '../../pedido.model';

@Component({
  selector: 'app-pedido-card',
  standalone: true,
  imports: [NgClass, LowerCasePipe, CurrencyPipe], // <-- Agregar aquí
  templateUrl: './pedido-card.component.html',
  styleUrl: './pedido-card.component.css'
})
export class PedidoCardComponent {
  @Input({ required: true }) pedido!: Pedido;
  @Output() editar = new EventEmitter<Pedido>();
  @Output() eliminar = new EventEmitter<number>();

  onEditar(): void {
    this.editar.emit(this.pedido);
  }

  onEliminar(): void {
    this.eliminar.emit(this.pedido.id);
  }
}