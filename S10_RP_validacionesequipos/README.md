# S10 – Reto Práctico: Validaciones Avanzadas y Estados del Formulario

**Sistema de Control de Equipos Tecnológicos** — Vilcapuma Trujillo, Jorge Luis (Estudiante 12)

Continuación del proyecto de la sesión S09 (`S09_RP_controlequipos`). Aplicación SPA con **Angular 19**, arquitectura `NgModule` y **Reactive Forms** (`ReactiveFormsModule` + `FormBuilder`), enriquecida con validaciones avanzadas, validadores personalizados y control de estados del formulario.

## Mejoras de validación implementadas

| Campo | Regla | Validadores |
|---|---|---|
| **Serie / MAC** | Obligatorio, mínimo 8 caracteres alfanuméricos (máx. 20), sin solo espacios y sin repetirse | `required`, `sinEspaciosBlancos()`, `minLength(8)`, `maxLength(20)`, `pattern('^[A-Za-z0-9]+$')`, `serieUnica()` |
| **Valor estimado** | Obligatorio, numérico mayor a 0, máx. S/ 100 000 y hasta 2 decimales | `required`, `mayorQueCero()`, `max(100000)`, `maxDosDecimales()` |
| **Área asignada** | Obligatorio: Sistemas, Redes o Contabilidad | `required` |
| Tipo de equipo | Obligatorio | `required` |

Los validadores personalizados reutilizables están en `src/app/validators/equipo.validators.ts` (`ValidatorFn` que retorna `null` si es válido o un objeto `ValidationErrors` si es inválido).

## Control de estados

- Las alertas se muestran con `*ngIf` solo cuando el campo está **`touched`** e **`invalid`**, y cada mensaje usa **`hasError()`** para indicar la causa exacta.
- Los campos válidos se resaltan en verde y los inválidos en rojo.
- Panel con los estados del `FormGroup`: **VALID / INVALID**, **touched** y **dirty**.
- Al presionar **Registrar equipo** con errores se invoca **`markAllAsTouched()`**, se muestran todas las alertas y se detiene el guardado.

## Operaciones de M11 conservadas

- Registrar equipos en el inventario (arreglo en memoria).
- Listar registros en la tabla del inventario con resumen de cantidad y valor total.
- **Dar de baja** (eliminar) equipos.
- **Limpiar** el formulario.

## Casos de prueba (video)

1. **Serie corta:** escribir `ABC12` → alerta "La serie es muy corta: mínimo 8 caracteres (5/8)".
2. **Área sin seleccionar:** dejar el área vacía y presionar *Registrar equipo* → `markAllAsTouched()` muestra "Debe seleccionar un área".
3. **Equipo válido:** Laptop, serie `ABC12345`, área Sistemas, valor `2500.50` → el formulario pasa a **VALID** y el equipo se agrega al inventario.

## Instrucciones de arranque

```bash
npm install
ng serve
```

Abrir `http://localhost:4200/` en el navegador.
