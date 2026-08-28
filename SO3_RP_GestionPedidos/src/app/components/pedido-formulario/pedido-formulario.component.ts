import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Pedido } from '../../pedido.model';

@Component({
  selector: 'app-pedido-formulario',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './pedido-formulario.component.html',
  styleUrl: './pedido-formulario.component.css'
})
export class PedidoFormularioComponent implements OnChanges {
  @Input() pedidoAEditar: Pedido | null = null;
  @Output() guardar = new EventEmitter<Omit<Pedido, 'id'> | Pedido>();
  @Output() cancelar = new EventEmitter<void>();

  cliente: string = '';
  producto: string = '';
  cantidad: number = 1;
  precioTotal: number = 0;
  estado: 'Pendiente' | 'Procesando' | 'Completado' | 'Cancelado' = 'Pendiente';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pedidoAEditar'] && this.pedidoAEditar) {
      this.cliente = this.pedidoAEditar.cliente;
      this.producto = this.pedidoAEditar.producto;
      this.cantidad = this.pedidoAEditar.cantidad;
      this.precioTotal = this.pedidoAEditar.precioTotal;
      this.estado = this.pedidoAEditar.estado;
    } else if (!this.pedidoAEditar) {
      this.limpiarFormulario();
    }
  }

  onSubmit(): void {
    if (!this.cliente || !this.producto || this.precioTotal <= 0) return;

    if (this.pedidoAEditar) {
      this.guardar.emit({
        id: this.pedidoAEditar.id,
        cliente: this.cliente,
        producto: this.producto,
        cantidad: this.cantidad,
        precioTotal: this.precioTotal,
        estado: this.estado
      });
    } else {
      this.guardar.emit({
        cliente: this.cliente,
        producto: this.producto,
        cantidad: this.cantidad,
        precioTotal: this.precioTotal,
        estado: this.estado
      });
    }

    this.limpiarFormulario();
  }

  limpiarFormulario(): void {
    this.cliente = '';
    this.producto = '';
    this.cantidad = 1;
    this.precioTotal = 0;
    this.estado = 'Pendiente';
  }

  onCancelar(): void {
    this.limpiarFormulario();
    this.cancelar.emit();
  }
}