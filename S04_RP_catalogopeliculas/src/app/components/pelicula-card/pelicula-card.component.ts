import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pelicula } from '../../models/pelicula';

@Component({
  selector: 'app-pelicula-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pelicula-card.component.html',
  styleUrls: ['./pelicula-card.component.css']
})
export class PeliculaCardComponent {
  @Input() pelicula!: Pelicula;
}