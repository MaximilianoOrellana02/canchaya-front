export interface Complejo {
    id?: string; // Opcional porque cuando el dueño lo crea por primera vez, la BD recién le asigna el ID
    nombre: string;
    direccion: string;
    telefono: string;

    // Coordenadas
    latitud: number;         // numeric(10,8)
    longitud: number;

    // Horarios (en la BD están en snake_case)
    hora_apertura: string;   // time without time zone (ej: '08:00:00')
    hora_cierre: string;     // time without time zone (ej: '23:30:00')// numeric(11,8)

    // Estado y relación
    estado: string;          // enum_complejos_estado (ej: 'activo', 'inactivo', 'mantenimiento')
    usuario_duenio: string;  // uuid de la FK del dueño

    // Lógica de negocio
    imagenUrl?: string;
    valoracion?: number;
}