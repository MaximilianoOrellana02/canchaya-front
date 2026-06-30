export interface UsuarioInterface {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    rol: 'jugador' | 'duenio' | 'admin';
    estado: boolean;
    createdAt?: string;
    updatedAt?: string;
}
