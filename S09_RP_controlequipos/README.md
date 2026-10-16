# S09 – Reto Práctico: Formularios Reactivos en Angular

**Sistema de Control de Equipos Tecnológicos** — Vilcapuma Trujillo, Jorge Luis (Estudiante 12)

Aplicación SPA desarrollada con **Angular 19** usando arquitectura `NgModule` y **Reactive Forms** (`ReactiveFormsModule` + `FormBuilder`). Sin componentes standalone, sin `HttpClient`, sin backend y sin librerías UI externas.

## Funcionalidades

- **Formulario reactivo** creado con `FormBuilder` y enlazado con `[formGroup]`, `formControlName` y `(ngSubmit)="guardar()"`:
  - Tipo de equipo (Laptop, Monitor, Impresora, etc.) — obligatorio
  - Número de serie — obligatorio, **mínimo 6 caracteres alfanuméricos**
  - Área asignada — **obligatorio**
  - Valor estimado — **mayor a 0**
- **Alertas de error contextuales** debajo de cada campo (serie muy corta, caracteres no válidos, valor inválido, etc.).
- Botón de registro deshabilitado con `[disabled]="equipoForm.invalid"` y **reset manual** del formulario tras cada registro exitoso.
- **Inventario activo de TI**: tabla dinámica con `*ngFor`, resumen de cantidad y valor total, y botón **Dar de baja** para eliminar registros.
- Datos en memoria (arreglo TypeScript `inventario`); se borran al recargar la página.

## Archivos principales

| Archivo | Descripción |
|---|---|
| `src/app/app.module.ts` | Registro de `ReactiveFormsModule` |
| `src/app/app.component.ts` | `FormBuilder`, validaciones, registrar, dar de baja y limpiar |
| `src/app/app.component.html` | Formulario reactivo, alertas e inventario |
| `src/app/app.component.css` | Estilos del componente |

## Instrucciones de arranque

```bash
npm install
ng serve
```

Abrir `http://localhost:4200/` en el navegador.
