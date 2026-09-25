import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService, Producto } from '../../services/producto.service';

@Component({
  selector: 'app-producto-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-lista.component.html',
  styleUrls: ['./producto-lista.component.css']
})
export class ProductoListaComponent implements OnInit {
  private productoService = inject(ProductoService);

  productos: Producto[] = [];
  totalProductos: number = 0;
  editando: boolean = false;
  productoIdEdicion: number | null = null;

  // Formulario vinculado a inputs mediante [(ngModel)]
  productoForm: Producto = {
    title: '',
    price: 0,
    thumbnail: ''
  };

  ngOnInit(): void {
    this.cargarProductos();
  }

  // ===== MÉTODO GET (CARGAR CATÁLOGO) =====
  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe({
      next: (res: any) => {
        this.productos = res.products || [];
        this.totalProductos = res.total || this.productos.length;
      },
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }

  // ===== MÉTODO GUARDAR (MANEJA POST Y PUT) =====
  guardarProducto(): void {
    if (!this.productoForm.title || this.productoForm.price === null || this.productoForm.price === undefined) {
      alert('Por favor ingrese un nombre y un precio válido.');
      return;
    }

    if (this.editando && this.productoIdEdicion !== null) {
      // --- OPERACIÓN PUT (ACTUALIZAR) ---
      const datosActualizados = {
        title: this.productoForm.title,
        price: Number(this.productoForm.price),
        thumbnail: this.productoForm.thumbnail
      };

      this.productoService.actualizarProducto(this.productoIdEdicion, datosActualizados).subscribe({
        next: (res) => {
          // Sincronización inmediata en el arreglo local
          const index = this.productos.findIndex(p => p.id === this.productoIdEdicion);
          if (index !== -1) {
            this.productos[index] = {
              ...this.productos[index],
              title: datosActualizados.title,
              price: datosActualizados.price,
              thumbnail: datosActualizados.thumbnail || this.productos[index].thumbnail
            };
          }
          this.cancelarEdicion();
        },
        error: (err) => {
          console.error('Error en la API al actualizar:', err);
          // Fallback local por si la API falla
          const index = this.productos.findIndex(p => p.id === this.productoIdEdicion);
          if (index !== -1) {
            this.productos[index].title = datosActualizados.title;
            this.productos[index].price = datosActualizados.price;
          }
          this.cancelarEdicion();
        }
      });

    } else {
      // --- OPERACIÓN POST (CREAR) ---
      const nuevaPrenda: Producto = {
        title: this.productoForm.title,
        price: Number(this.productoForm.price),
        thumbnail: this.productoForm.thumbnail || 'https://via.placeholder.com/200?text=Ropa'
      };

      this.productoService.registrarProducto(nuevaPrenda).subscribe({
        next: (res) => {
          this.productos.unshift({
            ...nuevaPrenda,
            id: res.id || Math.floor(Math.random() * 1000) + 100
          });
          this.totalProductos++;
          this.resetearFormulario();
        },
        error: (err) => {
          console.error('Error en la API al registrar:', err);
          this.productos.unshift({
            ...nuevaPrenda,
            id: Math.floor(Math.random() * 1000) + 100
          });
          this.totalProductos++;
          this.resetearFormulario();
        }
      });
    }
  }

  // ===== SELECCIONAR PARA EDITAR =====
  seleccionarParaEditar(prod: Producto): void {
    if (!prod.id) return;
    this.editando = true;
    this.productoIdEdicion = prod.id;
    
    // Copia de los valores exactos al formulario
    this.productoForm = {
      title: prod.title,
      price: prod.price,
      thumbnail: prod.thumbnail || ''
    };

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ===== CANCELAR EDICIÓN =====
  cancelarEdicion(): void {
    this.editando = false;
    this.productoIdEdicion = null;
    this.resetearFormulario();
  }

  // ===== MÉTODO DELETE (ELIMINAR) =====
  eliminarProducto(id: number | undefined): void {
    if (!id) {
      console.warn('ID no válido para eliminar');
      return;
    }

    const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar el producto #${id}?`);
    
    if (confirmacion) {
      // 1. Eliminación visual inmediata del arreglo local
      this.productos = this.productos.filter(p => p.id !== id);
      if (this.totalProductos > 0) this.totalProductos--;

      // 2. Si estábamos editando esta prenda, limpiamos el formulario
      if (this.editando && this.productoIdEdicion === id) {
        this.cancelarEdicion();
      }

      // 3. Petición HTTP a la API
      this.productoService.eliminarProducto(id).subscribe({
        next: (res) => console.log(`Producto #${id} eliminado correctamente en la API:`, res),
        error: (err) => console.error(`Error al eliminar en la API el producto #${id}:`, err)
      });
    }
  }

  private resetearFormulario(): void {
    this.productoForm = { title: '', price: 0, thumbnail: '' };
  }
}