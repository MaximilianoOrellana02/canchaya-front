import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router)

  mensajeError: string = '';

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  iniciarSesion() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const credenciales = this.loginForm.getRawValue() as { email: string; password: string }

    this.authService.login(credenciales).subscribe({
      next: (respuesta) => {
        const rol = respuesta.usuario.rol;

        if (rol === 'duenio') {
          this.router.navigate(['/panel-duenio/dashboard']);
          console.log(respuesta.usuario);
        } else {
          this.router.navigate(['/inicio'])
        }
      },
      error: (err) => {
        this.mensajeError = err.error.msg || 'Error al iniciar sesion';
        console.error(err);
      }
    })
  }
}
