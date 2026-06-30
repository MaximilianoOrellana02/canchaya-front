import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const noAuthGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.estaLogueado()) {
        const usuarioString = localStorage.getItem('usuario')

        if (usuarioString) {
            const usuario = JSON.parse(usuarioString);

            if (usuario.rol === 'duenio') {
                router.navigate(['/panel-duenio/dashboard']);
            } else {
                router.navigate(['/portal-jugador/home']);
            }
        } else {
            router.navigate(['/'])
        }
        return false;
    }

    return true;
}