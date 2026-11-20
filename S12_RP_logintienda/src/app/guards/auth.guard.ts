import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Protege las rutas del Dashboard.
 * - Con sesión activa: deja pasar.
 * - Sin sesión: redirige al Login y recuerda la URL que se intentó abrir.
 */
export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.estaAutenticado()) {
    return true;
  }

  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url, motivo: 'sin-sesion' },
  });
};

/**
 * Evita volver a ver el Login si ya hay una sesión iniciada.
 */
export const invitadoGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.estaAutenticado() ? router.createUrlTree(['/inicio']) : true;
};
