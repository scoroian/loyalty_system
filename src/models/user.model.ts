interface User {
    id: number; // Identificador único del usuario
    name: string; // Nombre completo del usuario
    email: string; // Correo electrónico del usuario
    password: string; // Contraseña encriptada del usuario
    contactDetails: string; // Información de contacto adicional del usuario
    role: 'customer' | 'business' | 'admin'; // Rol del usuario en el sistema
}
