import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form = this.fb.nonNullable.group({
    correo: ['', [Validators.required, Validators.email]],
    clave: ['', [Validators.required, Validators.minLength(6)]],
  });

  error = signal('');
  verClave = signal(false);
  cargando = signal(false);

  // Mensaje cuando el Guard redirige aquí o al cerrar sesión
  aviso = this.mensajeAviso(this.route.snapshot.queryParamMap.get('motivo'));

  campoInvalido(nombre: 'correo' | 'clave'): boolean {
    const c = this.form.controls[nombre];
    return c.invalid && c.touched;
  }

  ingresar(): void {
    this.error.set('');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando.set(true);
    const { correo, clave } = this.form.getRawValue();

    if (this.auth.login(correo, clave)) {
      const destino = this.route.snapshot.queryParamMap.get('returnUrl') || '/inicio';
      this.router.navigateByUrl(destino);
    } else {
      this.error.set('Correo o contraseña incorrectos. Verifica tus datos e inténtalo de nuevo.');
      this.form.controls.clave.reset();
    }
    this.cargando.set(false);
  }

  usarDemo(): void {
    this.form.setValue({ correo: 'admin@novamarket.com', clave: 'Admin123' });
    this.error.set('');
  }

  private mensajeAviso(motivo: string | null): string {
    if (motivo === 'sin-sesion') return 'Debes iniciar sesión para acceder a esa sección.';
    if (motivo === 'logout') return 'Cerraste sesión correctamente.';
    return '';
  }
}
