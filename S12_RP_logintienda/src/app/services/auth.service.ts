import { Injectable, computed, signal } from '@angular/core';

export interface Usuario {
  correo: string;
  nombre: string;
  rol: string;
}

export interface Sesion extends Usuario {
  inicio: string; // fecha y hora de inicio de sesión
}

// Usuarios de prueba (solo con fines educativos, no es seguridad real)
const USUARIOS_PRUEBA: (Usuario & { clave: string })[] = [
  { correo: 'admin@novamarket.com', clave: 'Admin123', nombre: 'Jorge Vilcapuma', rol: 'Administrador' },
  { correo: 'ventas@novamarket.com', clave: 'Ventas123', nombre: 'Lucía Ramírez', rol: 'Vendedora' },
];

const CLAVE_STORAGE = 'novamarket_sesion';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Al crear el servicio se lee la sesión guardada (sirve al recargar la página)
  private sesion = signal<Sesion | null>(this.leerSesion());

  usuarioActual = this.sesion.asReadonly();
  autenticado = computed(() => this.sesion() !== null);

  /** 1. Validar credenciales: verifica correo y clave de prueba. */
  validarCredenciales(correo: string, clave: string): Usuario | null {
    const encontrado = USUARIOS_PRUEBA.find(
      u => u.correo === correo.trim().toLowerCase() && u.clave === clave
    );
    if (!encontrado) return null;
    const { clave: _, ...usuario } = encontrado;
    return usuario;
  }

  /** 2. Iniciar sesión: si las credenciales son válidas, guarda la sesión en localStorage. */
  login(correo: string, clave: string): boolean {
    const usuario = this.validarCredenciales(correo, clave);
    if (!usuario) return false;

    const nueva: Sesion = { ...usuario, inicio: new Date().toISOString() };
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(nueva));
    this.sesion.set(nueva);
    return true;
  }

  /** 3. Comprobar estado: confirma si hay una sesión activa en localStorage. */
  estaAutenticado(): boolean {
    const guardada = this.leerSesion();
    this.sesion.set(guardada);
    return guardada !== null;
  }

  /** 4. Cerrar sesión: elimina el registro de localStorage. */
  logout(): void {
    localStorage.removeItem(CLAVE_STORAGE);
    this.sesion.set(null);
  }

  private leerSesion(): Sesion | null {
    try {
      const texto = localStorage.getItem(CLAVE_STORAGE);
      return texto ? (JSON.parse(texto) as Sesion) : null;
    } catch {
      return null;
    }
  }
}
