import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { maxDosDecimales, mayorQueCero, sinEspaciosBlancos } from './validators/equipo.validators';

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
  tiposEquipo = ['Laptop', 'Monitor', 'Impresora', 'Proyector', 'Servidor', 'Router', 'Switch', 'Tablet'];
  areas = ['Sistemas', 'Redes', 'Contabilidad'];

  // Formulario reactivo construido con FormBuilder
  equipoForm: FormGroup;

  // Arreglo en memoria dinámica
  inventario: Equipo[] = [];

  // Contador para el código del activo
  private siguienteCodigo = 1;

  mensajeExito = '';

  // Se activa cuando el usuario intenta guardar con errores
  intentoFallido = false;

  // Límites de validación
  readonly serieMin = 8;
  readonly serieMax = 20;
  readonly valorMax = 100000;

  constructor(private fb: FormBuilder) {
    this.equipoForm = this.fb.group({
      tipo: ['', [Validators.required]],
      serie: ['', [
        Validators.required,
        sinEspaciosBlancos(),
        Validators.minLength(this.serieMin),
        Validators.maxLength(this.serieMax),
        Validators.pattern('^[A-Za-z0-9]+$'),
        this.serieUnica()
      ]],
      area: ['', [Validators.required]],
      valor: [null, [
        Validators.required,
        mayorQueCero(),
        Validators.max(this.valorMax),
        maxDosDecimales()
      ]]
    });
  }

  // Validador personalizado: la serie / MAC no puede repetirse en el inventario
  private serieUnica(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const serie = (control.value ?? '').toString().trim().toUpperCase();
      if (!serie) return null;
      const existe = this.inventario.some(e => e.serie === serie);
      return existe ? { serieDuplicada: true } : null;
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

  // La alerta solo se muestra si el campo fue tocado y es inválido
  invalido(nombre: string): boolean {
    const control = this.campo(nombre);
    return control.touched && control.invalid;
  }

  // Marca en verde los campos tocados que ya cumplen todas las reglas
  valido(nombre: string): boolean {
    const control = this.campo(nombre);
    return control.touched && control.valid;
  }

  guardar(): void {
    // 1. Comprobar si el formulario es inválido
    if (this.equipoForm.invalid) {
      // 2. Marcar todos los controles como tocados para mostrar las alertas
      this.equipoForm.markAllAsTouched();
      this.intentoFallido = true;
      // 3. Detener la ejecución de guardado
      return;
    }

    // 4. Proceder con el registro si es válido
    const datos = this.equipoForm.value;
    const serie = datos.serie.trim().toUpperCase();

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
    this.intentoFallido = false;
  }
}
