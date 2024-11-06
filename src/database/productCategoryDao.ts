import {closeDb, open} from "./baseDao";

// Crear una nueva categoría de producto
export async function createProductCategory(category: any) {
    const { businessId, name } = category;
    const sql = `
        INSERT INTO product_categories (businessId, name)
        VALUES (?, ?)
    `;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [businessId, name]);
        return result.lastID;
    } catch (error) {
        console.error('Error al crear la categoría de producto:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Obtener categorías de producto por negocio
export async function getProductCategoriesByBusiness(businessId: number) {
    const sql = `SELECT * FROM product_categories WHERE businessId = ?`;
    let db;
    try {
        db = await open();
        const categories = await db.all(sql, [businessId]);
        return categories;
    } catch (error) {
        console.error('Error al obtener las categorías de producto:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Actualizar una categoría de producto
export async function updateProductCategory(id: number, updates: any) {
    const { name } = updates;
    const sql = `
        UPDATE product_categories
        SET name = ?
        WHERE id = ?
    `;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [name, id]);
        return result.changes;
    } catch (error) {
        console.error('Error al actualizar la categoría de producto:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Eliminar una categoría de producto
export async function deleteProductCategory(id: number) {
    const sql = `DELETE FROM product_categories WHERE id = ?`;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [id]);
        return result.changes;
    } catch (error) {
        console.error('Error al eliminar la categoría de producto:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

export async function getAllProductCategory() {
    const sql = 'SELECT * FROM product_categories';
    let db;
    try {
        db = await open();
        const points = await db.all(sql);
        return points;
    } catch (error) {
        console.error('Error al obtener los puntos:', error);
        throw error;
    } finally {
        if (db) {
            await db.close();
        }
    }
}

export const productCategoryDao = {
    createProductCategory,
    getProductCategoriesByBusiness,
    updateProductCategory,
    deleteProductCategory,
    getAllProductCategory
};