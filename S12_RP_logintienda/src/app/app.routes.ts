import { Routes } from '@angular/router';
import { authGuard, invitadoGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductoDetalleComponent } from './pages/producto-detalle/producto-detalle.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { NoEncontradoComponent } from './pages/no-encontrado/no-encontrado.component';

export const routes: Routes = [
  // Ruta pública: Login (si ya hay sesión, invitadoGuard lo manda al Dashboard)
  { path: 'login', component: LoginComponent, canActivate: [invitadoGuard], title: 'Iniciar sesión | NovaMarket' },

  // Rutas protegidas: el Dashboard completo de S13 dentro del layout
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: InicioComponent, title: 'Inicio | NovaMarket' },
      { path: 'productos', component: ProductosComponent, title: 'Catálogo | NovaMarket' },
      { path: 'productos/:id', component: ProductoDetalleComponent, title: 'Detalle de producto | NovaMarket' },
      { path: 'categorias', component: CategoriasComponent, title: 'Categorías | NovaMarket' },
      { path: 'inventario', component: InventarioComponent, title: 'Inventario | NovaMarket' },
      // Ruta comodín: cualquier URL inexistente
      { path: '**', component: NoEncontradoComponent, title: 'Página no encontrada | NovaMarket' },
    ],
  },
];
