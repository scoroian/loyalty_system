interface Product {
    id: number; // Identificador único del producto
    businessId: number; // Referencia al negocio que ofrece el producto
    categoryId: number; // Referencia a la categoría del producto
    name: string; // Nombre del producto
    price: number; // Precio del producto
    description: string; // Descripción detallada del producto
    stockLevel: number; // Cantidad disponible en stock
}
