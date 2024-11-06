interface Purchase {
    id: number; // Identificador único de la compra
    customerId: number; // Referencia al cliente que realizó la compra
    businessId: number; // Referencia al negocio donde se realizó la compra
    purchaseDate: Date; // Fecha y hora de la compra
    items: PurchaseItem[]; // Lista de productos comprados
    totalAmount: number; // Monto total de la compra
    pointsEarned: number; // Puntos acumulados en esta compra
}
