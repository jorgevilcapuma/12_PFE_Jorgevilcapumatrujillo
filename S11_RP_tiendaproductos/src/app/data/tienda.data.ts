// Datos simulados (ficticios) de la tienda NovaMarket.

export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
  color: string;
}

export interface Producto {
  id: number;
  sku: string;
  nombre: string;
  categoriaId: number;
  marca: string;
  precio: number;
  precioAnterior?: number;
  stock: number;
  stockMinimo: number;
  descripcion: string;
}

export interface Movimiento {
  fecha: string;
  productoId: number;
  tipo: 'Entrada' | 'Salida';
  cantidad: number;
  motivo: string;
}

export const CATEGORIAS: Categoria[] = [
  { id: 1, nombre: 'Tecnología', descripcion: 'Laptops, celulares, audífonos y periféricos.', color: '#2563eb' },
  { id: 2, nombre: 'Hogar', descripcion: 'Electrodomésticos y artículos para casa.', color: '#16a34a' },
  { id: 3, nombre: 'Deportes', descripcion: 'Implementos deportivos y ropa de entrenamiento.', color: '#ea580c' },
  { id: 4, nombre: 'Oficina', descripcion: 'Útiles, mobiliario y accesorios de escritorio.', color: '#9333ea' },
  { id: 5, nombre: 'Accesorios', descripcion: 'Mochilas, relojes y complementos.', color: '#db2777' },
];

export const PRODUCTOS: Producto[] = [
  { id: 1, sku: 'TEC-001', nombre: 'Laptop Nova 14"', categoriaId: 1, marca: 'Nova', precio: 2899.9, precioAnterior: 3199.9, stock: 12, stockMinimo: 5, descripcion: 'Laptop de 14 pulgadas, 16 GB RAM y 512 GB SSD.' },
  { id: 2, sku: 'TEC-002', nombre: 'Audífonos Bluetooth Pulse', categoriaId: 1, marca: 'Pulse', precio: 189.9, stock: 3, stockMinimo: 8, descripcion: 'Audífonos inalámbricos con cancelación de ruido.' },
  { id: 3, sku: 'TEC-003', nombre: 'Mouse ergonómico Flow', categoriaId: 1, marca: 'Flow', precio: 79.5, stock: 40, stockMinimo: 10, descripcion: 'Mouse inalámbrico ergonómico de 6 botones.' },
  { id: 4, sku: 'HOG-001', nombre: 'Licuadora Turbo 600W', categoriaId: 2, marca: 'Cocinex', precio: 249.0, precioAnterior: 279.0, stock: 9, stockMinimo: 4, descripcion: 'Licuadora de 1.5 L con 5 velocidades.' },
  { id: 5, sku: 'HOG-002', nombre: 'Hervidor eléctrico 1.7 L', categoriaId: 2, marca: 'Cocinex', precio: 99.9, stock: 0, stockMinimo: 5, descripcion: 'Hervidor de acero inoxidable con apagado automático.' },
  { id: 6, sku: 'DEP-001', nombre: 'Balón de fútbol Pro', categoriaId: 3, marca: 'Kickers', precio: 119.0, stock: 25, stockMinimo: 10, descripcion: 'Balón talla 5 cosido a máquina.' },
  { id: 7, sku: 'DEP-002', nombre: 'Mancuernas ajustables 20 kg', categoriaId: 3, marca: 'FitCore', precio: 359.9, stock: 4, stockMinimo: 4, descripcion: 'Par de mancuernas con discos intercambiables.' },
  { id: 8, sku: 'OFI-001', nombre: 'Silla ergonómica Ofix', categoriaId: 4, marca: 'Ofix', precio: 649.0, precioAnterior: 699.0, stock: 7, stockMinimo: 3, descripcion: 'Silla con soporte lumbar y apoyabrazos regulables.' },
  { id: 9, sku: 'OFI-002', nombre: 'Pack cuadernos A4 x5', categoriaId: 4, marca: 'Papelex', precio: 32.5, stock: 120, stockMinimo: 30, descripcion: 'Cinco cuadernos cuadriculados de 100 hojas.' },
  { id: 10, sku: 'ACC-001', nombre: 'Mochila urbana Trek', categoriaId: 5, marca: 'Trek', precio: 159.0, stock: 2, stockMinimo: 6, descripcion: 'Mochila impermeable con compartimento para laptop.' },
  { id: 11, sku: 'ACC-002', nombre: 'Reloj deportivo Pace', categoriaId: 5, marca: 'Pace', precio: 299.9, stock: 15, stockMinimo: 5, descripcion: 'Reloj con GPS, pulsómetro y resistencia al agua.' },
  { id: 12, sku: 'TEC-004', nombre: 'Teclado mecánico Clack', categoriaId: 1, marca: 'Clack', precio: 229.0, stock: 18, stockMinimo: 6, descripcion: 'Teclado mecánico retroiluminado, switches rojos.' },
];

export const MOVIMIENTOS: Movimiento[] = [
  { fecha: '2026-11-16', productoId: 2, tipo: 'Salida', cantidad: 5, motivo: 'Venta mostrador' },
  { fecha: '2026-11-16', productoId: 9, tipo: 'Entrada', cantidad: 60, motivo: 'Compra a proveedor' },
  { fecha: '2026-11-15', productoId: 5, tipo: 'Salida', cantidad: 3, motivo: 'Venta online' },
  { fecha: '2026-11-15', productoId: 1, tipo: 'Entrada', cantidad: 6, motivo: 'Reposición' },
  { fecha: '2026-11-14', productoId: 10, tipo: 'Salida', cantidad: 4, motivo: 'Venta online' },
];

export type EstadoStock = 'Disponible' | 'Stock bajo' | 'Agotado';

export function estadoStock(p: Producto): EstadoStock {
  if (p.stock === 0) return 'Agotado';
  if (p.stock <= p.stockMinimo) return 'Stock bajo';
  return 'Disponible';
}

export function nombreCategoria(id: number): string {
  return CATEGORIAS.find(c => c.id === id)?.nombre ?? 'Sin categoría';
}
