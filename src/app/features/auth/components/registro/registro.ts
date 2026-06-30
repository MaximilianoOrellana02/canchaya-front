import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  private authService = inject(AuthService);
  private router = inject(Router);

  mensajeError: string = '';

  registroForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rol: new FormControl<'jugador' | 'duenio'>('jugador', Validators.required)
  });

  registrar() {
    if (this.registroForm.invalid) {
      this.registroForm.markAsTouched();
      return;
    }

    const datosRegistro = this.registroForm.getRawValue();

    this.authService.registro(datosRegistro).subscribe({
      next: (respuesta) => {
        const rol = respuesta.usuario?.rol || datosRegistro.rol;
        if (rol === 'duenio') {
          this.router.navigate(['/panel-duenio/dashboard']);
        } else {
          this.router.navigate(['/inicio']); // <-- Ajustado para ir a la vista pública
        }
      },
      error: (e) => {
        this.mensajeError = e.error.msg || 'Hubo un error al intentar registrarte';
        console.error(e);
      }
    })
  }
}
