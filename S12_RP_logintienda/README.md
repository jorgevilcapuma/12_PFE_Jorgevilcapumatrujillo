# S12 – Autenticación y Login en Angular

**NovaMarket – Tienda de Productos** · Vilcapuma Trujillo, Jorge Luis

Continuación del Dashboard de la sesión anterior (`S11_RP_tiendaproductos`, actividad S13 | AP7). Se conservan las cuatro vistas, el menú lateral y el diseño, y se agrega un sistema de inicio de sesión con **AuthService**, sesión en **localStorage**, **Guards** y **Logout**.

## Cuentas de prueba

| Correo | Contraseña | Rol |
|---|---|---|
| admin@novamarket.com | Admin123 | Administrador |
| ventas@novamarket.com | Ventas123 | Vendedora |

> Credenciales ficticias con fines educativos. No es un mecanismo de seguridad real.

## Qué se implementó

| Requerimiento | Archivo | Detalle |
|---|---|---|
| Pantalla de Login | `pages/login/` | Formulario reactivo con correo (`required`, `email`) y contraseña (`required`, `minLength(6)`), botón Ingresar, alertas de error visibles y mismo estilo del Dashboard |
| AuthService | `services/auth.service.ts` | `validarCredenciales()`, `login()`, `estaAutenticado()` y `logout()` |
| Gestión de sesión | `services/auth.service.ts` | Guarda la sesión en `localStorage` (clave `novamarket_sesion`), la lee al navegar o recargar y la borra al cerrar sesión |
| Protección de rutas | `guards/auth.guard.ts` | `authGuard` (`CanActivateFn`) bloquea el Dashboard sin sesión y redirige a `/login?returnUrl=…`; `invitadoGuard` evita volver al Login con sesión activa |
| Integración y Logout | `components/layout/` | Muestra el usuario conectado y tiene botón **Cerrar sesión** en el menú lateral y en el encabezado |

## Rutas (`app.routes.ts`)

```
/login                → LoginComponent        (invitadoGuard)
/  (LayoutComponent)  → authGuard + canActivateChild
   ├── /inicio
   ├── /productos
   ├── /productos/:id
   ├── /categorias
   ├── /inventario
   └── **  (404)
```

## Flujo

Usuario → Login → validación del formulario → `AuthService.login()` → sesión en localStorage → Dashboard.

- **Credenciales incorrectas:** mensaje de error, no se inicia sesión.
- **Usuario sin sesión:** el Guard redirige al Login y, después de ingresar, regresa a la página que intentó abrir.
- **Cerrar sesión:** se borra la sesión y se vuelve al Login.

## Capturas

La carpeta [`capturas/`](capturas/) contiene las evidencias: login, credenciales incorrectas, Dashboard con sesión, secciones, protección de rutas y cierre de sesión.

## Ejecución

```bash
npm install
ng serve
```

Abrir `http://localhost:4200/` (redirige al Login).
