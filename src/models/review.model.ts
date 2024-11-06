interface Review {
    id: number; // Identificador único de la reseña
    customerId: number; // Referencia al cliente que hizo la reseña
    businessId: number; // Referencia al negocio relacionado
    productId?: number; // Referencia opcional al producto reseñado
    rating: number; // Calificación otorgada (por ejemplo, de 1 a 5)
    comment: string; // Comentario del cliente
    date: Date; // Fecha y hora de la reseña
    response?: string; // Respuesta del negocio al comentario
}
