interface Reward {
    id: number; // Identificador único de la recompensa
    businessId: number; // Referencia al negocio que ofrece la recompensa
    description: string; // Descripción de la recompensa
    pointsRequired: number; // Puntos necesarios para redimir la recompensa
    stock: number; // Cantidad disponible de la recompensa
}
