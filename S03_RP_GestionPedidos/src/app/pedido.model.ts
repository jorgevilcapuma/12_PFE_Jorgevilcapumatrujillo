export interface Pedido {
  id: number;
  cliente: string;
  producto: string;
  cantidad: number;
  precioTotal: number;
  estado: 'Pendiente' | 'Procesando' | 'Completado' | 'Cancelado';
}