interface Business {
    id: number; // Identificador único del negocio
    userId: number; // Referencia al identificador del usuario
    businessName: string; // Nombre del negocio
    address: string; // Dirección física del negocio
    contactDetails: string; // Información de contacto del negocio
    categories: ProductCategory[]; // Categorías de productos ofrecidos
    products: Product[]; // Lista de productos del negocio
    rewards: Reward[]; // Recompensas disponibles para los clientes
    suspended: boolean; // Indica si el negocio está suspendido
    customers: number[]; // IDs de clientes que han realizado compras en el negocio
}
