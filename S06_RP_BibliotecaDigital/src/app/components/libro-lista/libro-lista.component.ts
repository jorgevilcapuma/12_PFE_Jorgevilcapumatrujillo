import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibroService } from '../../services/libro.service';

@Component({
  selector: 'app-libro-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './libro-lista.component.html',
  styleUrl: './libro-lista.component.css'
})
export class LibroListaComponent implements OnInit {

  private libroService = inject(LibroService);

  libros: any[] = [];
  cargando: boolean = true;
  modoEdicion: boolean = false;
  idEditando: number | null = null;

  nuevoLibro = {
    titulo: '',
    autor: '',
    anio: '',
    genero: '',
    imagen: ''
  };

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.cargando = true;
    this.libroService.obtenerLibros().subscribe({
      next: (respuesta) => {
        this.libros = respuesta.docs.slice(0, 8).map((doc: any, index: number) => ({
          id: index + 1,
          titulo: doc.title || 'Sin título',
          autor: doc.author_name ? doc.author_name[0] : 'Desconocido',
          anio: doc.first_publish_year || 'N/A',
          genero: doc.subject ? doc.subject[0] : 'Novela',
          imagen: doc.cover_i 
            ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-S.jpg` 
            : 'https://via.placeholder.com/40x60?text=No+Cover'
        }));
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar libros:', error);
        this.cargando = false;
      }
    });
  }

  guardarLibro(): void {
    if (!this.nuevoLibro.titulo || !this.nuevoLibro.autor) {
      alert('Por favor complete el título y autor');
      return;
    }

    if (this.modoEdicion && this.idEditando !== null) {
      // Editar (PUT)
      this.libroService.actualizarLibro(this.idEditando, this.nuevoLibro).subscribe({
        next: () => {
          alert('¡Libro actualizado exitosamente!');
          const idx = this.libros.findIndex(l => l.id === this.idEditando);
          if (idx !== -1) {
            this.libros[idx] = { ...this.nuevoLibro, id: this.idEditando };
          }
          this.limpiarFormulario();
        },
        error: (err) => console.error('Error al editar:', err)
      });
    } else {
      // Registrar (POST)
      const libroAInsertar = {
        ...this.nuevoLibro,
        id: Date.now(),
        imagen: this.nuevoLibro.imagen || 'https://via.placeholder.com/40x60?text=Nuevo'
      };

      this.libroService.registrarLibro(libroAInsertar).subscribe({
        next: () => {
          alert('¡Libro registrado exitosamente!');
          this.libros.unshift(libroAInsertar);
          this.limpiarFormulario();
        },
        error: (err) => console.error('Error al registrar:', err)
      });
    }
  }

  seleccionarParaEditar(item: any): void {
    this.modoEdicion = true;
    this.idEditando = item.id;
    this.nuevoLibro = { ...item };
  }

  eliminar(id: number): void {
    if (confirm('¿Está seguro de eliminar este libro?')) {
      this.libroService.eliminarLibro(id).subscribe({
        next: () => {
          alert('¡Libro eliminado exitosamente!');
          this.libros = this.libros.filter(l => l.id !== id);
        },
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }

  limpiarFormulario(): void {
    this.modoEdicion = false;
    this.idEditando = null;
    this.nuevoLibro = { titulo: '', autor: '', anio: '', genero: '', imagen: '' };
  }
}