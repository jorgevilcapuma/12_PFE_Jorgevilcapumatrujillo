import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PeliculaFormularioComponent } from './components/pelicula-formulario/pelicula-formulario.component';
import { PeliculaListaComponent } from './components/pelicula-lista/pelicula-lista.component';
import { Pelicula } from './models/pelicula';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    NavbarComponent, 
    PeliculaFormularioComponent, 
    PeliculaListaComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Arreglo almacenado únicamente en memoria sin uso de servicios
  peliculas: Pelicula[] = [
    { titulo: 'Inception', genero: 'Ciencia ficción', anio: 2010, calificacion: 9 },
    { titulo: 'El Padrino', genero: 'Drama', anio: 1972, calificacion: 10 },
    { titulo: 'Son Como Niños', genero: 'Comedia', anio: 2010, calificacion: 6 }
  ];

  onPeliculaAgregada(nuevaPelicula: Pelicula) {
    this.peliculas.push(nuevaPelicula);
  }
}