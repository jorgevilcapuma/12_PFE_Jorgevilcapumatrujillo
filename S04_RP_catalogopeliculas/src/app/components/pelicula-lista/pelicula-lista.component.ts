import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pelicula } from '../../models/pelicula';
import { PeliculaCardComponent } from '../pelicula-card/pelicula-card.component';

@Component({
  selector: 'app-pelicula-lista',
  standalone: true,
  imports: [CommonModule, PeliculaCardComponent],
  templateUrl: './pelicula-lista.component.html',
  styleUrls: ['./pelicula-lista.component.css']
})
export class PeliculaListaComponent {
  @Input() listaPeliculas: Pelicula[] = [];
}