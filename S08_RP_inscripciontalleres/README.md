# S08_RP_inscripciontalleres

Sistema de inscripción a talleres tecnológicos desarrollado con **Angular 19** y **Template Driven Forms** (arquitectura `NgModule` + `FormsModule`).

## Funcionalidades

- **Formulario de inscripción** con `[(ngModel)]`, `#formulario="ngForm"` y `(ngSubmit)`:
  - Nombre completo (obligatorio, mínimo 3 caracteres)
  - Correo institucional (obligatorio, formato válido)
  - Especialidad: Desarrollo, Redes, Inteligencia Artificial
  - Turno (radio buttons): Mañana / Noche
  - Modalidad: Presencial / Virtual
  - Nivel de experiencia: Principiante, Intermedio, Avanzado
- **Validaciones** con mensajes de error por campo; el botón se deshabilita mientras el formulario sea inválido.
- **Gestión de inscripciones**: tabla dinámica con `*ngFor`, número de inscripción, botón para eliminar, mensaje cuando no hay participantes y limpieza del formulario tras registrar.
- **Resumen (reto adicional)**: total de inscritos, participantes del turno mañana y del turno noche.
- **Estilos CSS propios**: distintivos de color por turno y por especialidad, diseño responsive.

## Archivos principales

| Archivo | Descripción |
|---|---|
| `src/app/app.module.ts` | Registro de `FormsModule` |
| `src/app/app.component.ts` | Lógica: registrar, eliminar, limpiar e indicadores |
| `src/app/app.component.html` | Formulario, indicadores y tabla |
| `src/app/app.component.css` | Estilos del componente |

## Ejecución

```bash
npm install
ng serve -o
```

La aplicación se abre en `http://localhost:4200/`.

> Los datos se guardan en memoria (arreglo `listaParticipantes`), por lo que se borran al recargar la página.
