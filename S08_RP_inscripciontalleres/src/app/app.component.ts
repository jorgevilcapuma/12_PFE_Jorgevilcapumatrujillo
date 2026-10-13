import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Participante {
  numero: number;
  nombre: string;
  correo: string;
  especialidad: string;
  turno: string;
  modalidad: string;
  nivel: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Opciones de las listas desplegables
  especialidades = ['Desarrollo', 'Redes', 'Inteligencia Artificial'];
  modalidades = ['Presencial', 'Virtual'];
  niveles = ['Principiante', 'Intermedio', 'Avanzado'];

  // Objeto vinculado al formulario
  nuevoParticipante = this.crearParticipanteVacio();

  // Arreglo en memoria local (temporal)
  listaParticipantes: Participante[] = [];

  // Contador para el número de inscripción
  private siguienteNumero = 1;

  mensajeExito = '';

  // Indicadores del resumen
  get totalInscritos(): number {
    return this.listaParticipantes.length;
  }

  get totalManana(): number {
    return this.listaParticipantes.filter(p => p.turno === 'Mañana').length;
  }

  get totalNoche(): number {
    return this.listaParticipantes.filter(p => p.turno === 'Noche').length;
  }

  registrarParticipante(formulario: NgForm): void {
    if (formulario.invalid) {
      formulario.form.markAllAsTouched();
      return;
    }

    this.listaParticipantes.push({
      numero: this.siguienteNumero++,
      ...this.nuevoParticipante
    });

    this.mensajeExito = `Inscripción de ${this.nuevoParticipante.nombre} registrada correctamente.`;
    setTimeout(() => this.mensajeExito = '', 3000);

    this.limpiarFormulario(formulario);
  }

  eliminarParticipante(numero: number): void {
    this.listaParticipantes = this.listaParticipantes.filter(p => p.numero !== numero);
  }

  limpiarFormulario(formulario: NgForm): void {
    this.nuevoParticipante = this.crearParticipanteVacio();
    formulario.resetForm(this.nuevoParticipante);
  }

  // Clase CSS según la especialidad (para los distintivos de color)
  claseEspecialidad(especialidad: string): string {
    switch (especialidad) {
      case 'Desarrollo': return 'badge-desarrollo';
      case 'Redes': return 'badge-redes';
      default: return 'badge-ia';
    }
  }

  private crearParticipanteVacio() {
    return {
      nombre: '',
      correo: '',
      especialidad: '',
      turno: 'Mañana',
      modalidad: '',
      nivel: ''
    };
  }
}
