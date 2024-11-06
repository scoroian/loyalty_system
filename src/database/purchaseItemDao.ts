import {closeDb, open} from "./baseDao";

// Agregar un ítem a una compra
export async function addPurchaseItem(item: any) {
    const { purchaseId, productId, quantity, priceAtPurchase } = item;
    const sql = `
        INSERT INTO purchase_items (purchaseId, productId, quantity, priceAtPurchase)
        VALUES (?, ?, ?, ?)
    `;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [purchaseId, productId, quantity, priceAtPurchase]);
        return result.lastID;
    } catch (error) {
        console.error('Error al agregar el ítem de compra:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Obtener ítems de una compra
export async function getPurchaseItems(purchaseId: number) {
    const sql = `SELECT * FROM purchase_items WHERE purchaseId = ?`;
    let db;
    try {
        db = await open();
        const items = await db.all(sql, [purchaseId]);
        return items;
    } catch (error) {
        console.error('Error al obtener los ítems de compra:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Eliminar un ítem de compra
export async function deletePurchaseItem(id: number) {
    const sql = `DELETE FROM purchase_items WHERE id = ?`;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [id]);
        return result.changes;
    } catch (error) {
        console.error('Error al eliminar el ítem de compra:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

export async function getAllPurchaseItem() {
    const sql = 'SELECT * FROM purchase_items';
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

export const purchaseItemDao = {
    addPurchaseItem,
    getPurchaseItems,
    deletePurchaseItem,
    getAllPurchaseItem
};