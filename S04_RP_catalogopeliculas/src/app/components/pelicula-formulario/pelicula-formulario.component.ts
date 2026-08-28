import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pelicula } from '../../models/pelicula';

@Component({
  selector: 'app-pelicula-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pelicula-formulario.component.html',
  styleUrls: ['./pelicula-formulario.component.css']
})
export class PeliculaFormularioComponent {
  @Output() peliculaAgregada = new EventEmitter<Pelicula>();

  titulo: string = '';
  genero: string = '';
  anio: number | null = null;
  calificacion: number | null = null;

  generosDisponibles: string[] = [
    'Acción',
    'Comedia',
    'Drama',
    'Terror',
    'Ciencia ficción'
  ];

  agregarPelicula() {
    if (this.titulo && this.genero && this.anio && this.calificacion !== null) {
      const nuevaPelicula: Pelicula = {
        titulo: this.titulo.trim(),
        genero: this.genero,
        anio: Number(this.anio),
        calificacion: Number(this.calificacion)
      };

      this.peliculaAgregada.emit(nuevaPelicula);

      // Limpiar Formulario
      this.titulo = '';
      this.genero = '';
      this.anio = null;
      this.calificacion = null;
    }
  }
}