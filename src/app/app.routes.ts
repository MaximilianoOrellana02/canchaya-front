import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { Dashboard } from './features/panel-duenio/pages/dashboard/dashboard';
import { HomeJugador } from './features/portal-jugador/pages/home-jugador/home-jugador';
import { MisComplejos } from './features/panel-duenio/pages/mis-complejos/mis-complejos';
import { AdminCanchas } from './features/panel-duenio/pages/admin-canchas/admin-canchas';
import { Agenda } from './features/panel-duenio/pages/agenda/agenda';
import { noAuthGuard } from './core/guards/no-auth.guard';
import { Login } from './features/auth/components/login/login';
import { Registro } from './features/auth/components/registro/registro';

export const routes: Routes = [
    // --- Rutas Públicas ---
    { path: 'auth/login', component: Login, canActivate: [noAuthGuard] },
    { path: 'auth/registro', component: Registro, canActivate: [noAuthGuard] },

    { path: 'inicio', component: HomeJugador },

    // --- Rutas Privadas: Solo DUEÑOS ---
    {
        path: 'panel-duenio/dashboard',
        component: Dashboard,
        canActivate: [authGuard, roleGuard],
        data: { roles: ['duenio'] }
    },
    {
        path: 'panel-duenio/complejos',
        component: MisComplejos,
        canActivate: [authGuard, roleGuard],
        data: { roles: ['duenio'] }
    },
    {
        path: 'panel-duenio/canchas',
        component: AdminCanchas,
        canActivate: [authGuard, roleGuard],
        data: { roles: ['duenio'] }
    },
    {
        path: 'panel-duenio/agenda',
        component: Agenda,
        canActivate: [authGuard, roleGuard],
        data: { roles: ['duenio'] }
    },

    // --- Rutas Privadas: Solo JUGADORES ---
    {
        path: 'portal-jugador/home',
        component: HomeJugador,
        canActivate: [authGuard, roleGuard],
        data: { roles: ['jugador'] }
    },

    // Ruta comodín: si tipea cualquier cosa, lo mandamos al login
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    { path: '**', redirectTo: '/inicio', pathMatch: 'full' }
];
