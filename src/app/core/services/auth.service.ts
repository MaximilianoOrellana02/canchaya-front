import { inject, Injectable, signal } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.apiUrl;
    private http = inject(HttpClient);

    usuarioActivo = signal<any>(this.obtenerUsuarioDelLocalStorage())

    login(credenciales: { email: string, password: string }): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/auth/login`, credenciales).pipe(
            tap(respuesta => {
                if (respuesta.token) {
                    localStorage.setItem('token', respuesta.token);
                }
                if (respuesta.usuario) {
                    localStorage.setItem('usuario', JSON.stringify(respuesta.usuario));
                }

                this.usuarioActivo.set(respuesta.usuario)
            })
        );
    }

    registro(datos: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/auth/registro`, datos).pipe(
            tap(respuesta => {
                if (respuesta.token) {
                    localStorage.setItem('token', respuesta.token);
                    localStorage.setItem('usuario', JSON.stringify(respuesta.usuario))

                    this.usuarioActivo.set(respuesta.usuario)
                }
            })
        )
    }

    estaLogueado(): boolean {
        return !!localStorage.getItem('token');
    }

    cerrarSesion(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        this.usuarioActivo.set(null)
    }

    obtenerRol(): string | null {
        const usuarioString = localStorage.getItem('usuario');
        if (usuarioString) {
            const usuario = JSON.parse(usuarioString);
            return usuario.rol
        }
        return null;
    }

    private obtenerUsuarioDelLocalStorage() {
        const usuarioString = localStorage.getItem('usuario');
        return usuarioString ? JSON.parse(usuarioString) : null;
    }
}
