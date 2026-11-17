# S11 – Dashboard con Angular Routing

**NovaMarket – Tienda de Productos** · Vilcapuma Trujillo, Jorge Luis

Alternativa elegida: **3. Tienda de Productos** (catálogo, categorías, inventario y consulta de precios).

Aplicación SPA en **Angular 19** (componentes standalone) que navega entre secciones con **Angular Router** sin recargar la página. Los datos son ficticios y están en `src/app/data/tienda.data.ts`.

## Rutas (`src/app/app.routes.ts`)

| Ruta | Componente | Contenido |
|---|---|---|
| `/` | — | Redirige a `/inicio` |
| `/inicio` | `InicioComponent` | Bienvenida, tarjetas KPI, alertas de stock, ofertas, productos por categoría y últimos movimientos |
| `/productos` | `ProductosComponent` | Catálogo con consulta de precios: búsqueda, filtro por categoría y orden por precio |
| `/productos/:id` | `ProductoDetalleComponent` | Detalle del producto (parámetro de ruta `:id`), descuento y relacionados |
| `/categorias` | `CategoriasComponent` | Tarjetas por categoría con cantidad, unidades y rango de precios |
| `/inventario` | `InventarioComponent` | Stock vs. stock mínimo, estado (Disponible / Stock bajo / Agotado) y movimientos |
| `**` | `NoEncontradoComponent` | Ruta comodín para URLs inexistentes (404) |

## Elementos de Routing utilizados

- **`app.routes.ts`**: definición de rutas, `redirectTo` y ruta comodín `**`.
- **`RouterOutlet`**: en `components/layout` muestra la vista activa.
- **`RouterLink`**: navegación del menú lateral, enlaces internos y `queryParams` (Categorías → Catálogo filtrado).
- **`RouterLinkActive`**: resalta la opción activa del menú (clase `activo`).
- **`ActivatedRoute`**: lectura del parámetro `:id` en el detalle del producto.

## Estructura

```
src/app
├── components/layout      # Menú lateral fijo + encabezado + <router-outlet>
├── data/tienda.data.ts    # Productos, categorías y movimientos simulados
├── pages
│   ├── inicio
│   ├── productos
│   ├── producto-detalle
│   ├── categorias
│   ├── inventario
│   └── no-encontrado
├── app.component.*
├── app.config.ts
└── app.routes.ts
```

## Ejecución

```bash
npm install
ng serve
```

Abrir `http://localhost:4200/`.
