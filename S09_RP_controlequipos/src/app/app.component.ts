import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

interface Equipo {
  codigo: number;
  tipo: string;
  serie: string;
  area: string;
  valor: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Opciones de las listas desplegables
  tiposEquipo = ['Laptop', 'Monitor', 'Impresora', 'Proyector', 'Servidor', 'Router', 'Tablet'];
  areas = ['Administración', 'Contabilidad', 'Recursos Humanos', 'Soporte TI', 'Logística', 'Gerencia'];

  // Formulario reactivo construido con FormBuilder
  equipoForm: FormGroup;

  // Arreglo en memoria dinámica
  inventario: Equipo[] = [];

  // Contador para el código del activo
  private siguienteCodigo = 1;

  mensajeExito = '';

  // Límites de validación
  readonly serieMax = 20;
  readonly valorMax = 100000;

  constructor(private fb: FormBuilder) {
    this.equipoForm = this.fb.group({
      tipo: ['', [Validators.required]],
      serie: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(this.serieMax),
        Validators.pattern(/^[A-Za-z0-9]+$/),
        this.serieUnica()
      ]],
      area: ['', [Validators.required]],
      valor: [null, [
        Validators.required,
        Validators.min(0.01),
        Validators.max(this.valorMax),
        this.maxDosDecimales()
      ]]
    });
  }

  // Validador personalizado: la serie no puede repetirse en el inventario
  private serieUnica(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const serie = (control.value ?? '').toString().trim().toUpperCase();
      if (!serie) return null;
      const existe = this.inventario.some(e => e.serie === serie);
      return existe ? { serieDuplicada: true } : null;
    };
  }

  // Validador personalizado: como máximo 2 decimales
  private maxDosDecimales(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valor = control.value;
      if (valor === null || valor === '') return null;
      return /^\d+(\.\d{1,2})?$/.test(valor.toString()) ? null : { decimales: true };
    };
  }

  // Indicadores del resumen
  get totalEquipos(): number {
    return this.inventario.length;
  }

  get valorTotal(): number {
    return this.inventario.reduce((suma, e) => suma + e.valor, 0);
  }

  // Acceso rápido a un control desde la plantilla
  campo(nombre: string): AbstractControl {
    return this.equipoForm.get(nombre)!;
  }

  // Indica si un campo debe mostrar su alerta de error
  invalido(nombre: string): boolean {
    const control = this.campo(nombre);
    return control.invalid && (control.touched || control.dirty);
  }

  guardar(): void {
    if (this.equipoForm.invalid) {
      this.equipoForm.markAllAsTouched();
      return;
    }

    const datos = this.equipoForm.value;
    const serie = datos.serie.toUpperCase();

    this.inventario.push({
      codigo: this.siguienteCodigo++,
      tipo: datos.tipo,
      serie,
      area: datos.area,
      valor: Number(datos.valor)
    });

    this.mensajeExito = `Equipo ${datos.tipo} (serie ${serie}) registrado correctamente.`;
    setTimeout(() => this.mensajeExito = '', 3000);

    this.limpiar();
  }

  darDeBaja(codigo: number): void {
    const equipo = this.inventario.find(e => e.codigo === codigo);
    if (!equipo || !confirm(`¿Dar de baja el equipo ${equipo.tipo} (serie ${equipo.serie})?`)) return;

    this.inventario = this.inventario.filter(e => e.codigo !== codigo);
    // La serie liberada puede volver a usarse
    this.campo('serie').updateValueAndValidity();
  }

  // Reset manual del formulario
  limpiar(): void {
    this.equipoForm.reset({ tipo: '', serie: '', area: '', valor: null });
  }
}
