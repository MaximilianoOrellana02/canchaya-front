export interface Cancha {
    id?: string;
    nombre: string;
    tipo: string;
    precio: number;
    duracion_turno: number;
    estado: boolean;
    complejo_id: string;


    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}