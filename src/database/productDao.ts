import {closeDb, open} from "./baseDao";

// Crear un nuevo producto
export async function createProduct(product: any) {
    const { businessId, categoryId, name, price, description, stockLevel } = product;
    const sql = `
        INSERT INTO products (businessId, categoryId, name, price, description, stockLevel)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [businessId, categoryId, name, price, description, stockLevel]);
        return result.lastID;
    } catch (error) {
        console.error('Error al crear el producto:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Obtener productos por negocio
export async function getProductsByBusiness(businessId: number) {
    const sql = `SELECT * FROM products WHERE businessId = ?`;
    let db;
    try {
        db = await open();
        const products = await db.all(sql, [businessId]);
        return products;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Actualizar un producto
export async function updateProduct(id: number, updates: any) {
    const { name, price, description, stockLevel } = updates;
    const sql = `
        UPDATE products
        SET name = ?, price = ?, description = ?, stockLevel = ?
        WHERE id = ?
    `;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [name, price, description, stockLevel, id]);
        return result.changes;
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Eliminar un producto
export async function deleteProduct(id: number) {
    const sql = `DELETE FROM products WHERE id = ?`;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [id]);
        return result.changes;
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

export async function getAllProducts() {
    const sql = 'SELECT * FROM products';
    let db;
    try {
        db = await open();
        const products = await db.all(sql);
        return products;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        throw error;
    } finally {
        if (db) {
            await db.close();
        }
    }
}

export const productDao = {
    createProduct,
    getProductsByBusiness,
    updateProduct,
    deleteProduct,
    getAllProducts
};