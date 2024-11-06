interface Customer {
    id: number; // Identificador único del cliente
    userId: number; // Referencia al identificador del usuario
    registeredBusinesses: number[]; // IDs de negocios donde el cliente está registrado
    points: Points[]; // Lista de puntos acumulados por negocio
    purchaseHistory: Purchase[]; // Historial de compras del cliente
    redeemedRewards: RedeemedReward[]; // Recompensas redimidas por el cliente
    reviews: Review[]; // Reseñas realizadas por el cliente
    achievements: CustomerAchievement[]; // Logros obtenidos por el cliente
}
