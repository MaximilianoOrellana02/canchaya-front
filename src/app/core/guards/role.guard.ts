import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const roleGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);

    const rolesPermitidos = route.data['roles'] as Array<string>;

    const usuarioString = localStorage.getItem('usuario');

    if (!usuarioString) {
        router.navigate(['/auth/login']);
        return false;
    }

    const usuario = JSON.parse(usuarioString);

    if (rolesPermitidos && rolesPermitidos.includes(usuario.rol)) {
        return true;
    }
    if (usuario.rol === 'jugador') {
        router.navigate(['/portal-jugador/home']);
    } else if (usuario.rol === 'duenio') {
        router.navigate(['/panel-duenio/dashboard']);
    } else {
        router.navigate(['/']);
    }

    return false;
}