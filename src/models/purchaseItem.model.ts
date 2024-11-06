interface PurchaseItem {
    id: number; // Identificador único del ítem de compra
    purchaseId: number; // Referencia a la compra asociada
    productId: number; // Referencia al producto comprado
    quantity: number; // Cantidad del producto comprado
    priceAtPurchase: number; // Precio del producto en el momento de la compra
}
