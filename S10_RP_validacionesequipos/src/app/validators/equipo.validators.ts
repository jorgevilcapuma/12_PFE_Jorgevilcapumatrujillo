import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validador personalizado: el campo no puede contener solo espacios en blanco
export function sinEspaciosBlancos(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;
    if (valor === null || valor === '') return null;
    const esEspacio = valor.toString().trim().length === 0;
    return esEspacio ? { sinEspacios: true } : null;
  };
}

// Validador personalizado: el valor numérico debe ser estrictamente mayor a 0
export function mayorQueCero(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;
    if (valor === null || valor === '') return null;
    const numero = Number(valor);
    return !isNaN(numero) && numero > 0 ? null : { mayorQueCero: true };
  };
}

// Validador personalizado: como máximo 2 decimales
export function maxDosDecimales(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;
    if (valor === null || valor === '') return null;
    return /^-?\d+(\.\d{1,2})?$/.test(valor.toString()) ? null : { decimales: true };
  };
}
