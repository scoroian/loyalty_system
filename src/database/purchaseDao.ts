import {closeDb, open} from "./baseDao";

// Registrar una nueva compra
export async function createPurchase(purchase: any) {
    const { customerId, businessId, purchaseDate, totalAmount, pointsEarned } = purchase;
    const sql = `
        INSERT INTO purchases (customerId, businessId, purchaseDate, totalAmount, pointsEarned)
        VALUES (?, ?, ?, ?, ?)
    `;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [customerId, businessId, purchaseDate, totalAmount, pointsEarned]);
        return result.lastID;
    } catch (error) {
        console.error('Error al registrar la compra:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Obtener compras por cliente
export async function getPurchasesByCustomer(customerId: number) {
    const sql = `SELECT * FROM purchases WHERE customerId = ?`;
    let db;
    try {
        db = await open();
        const purchases = await db.all(sql, [customerId]);
        return purchases;
    } catch (error) {
        console.error('Error al obtener las compras:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Eliminar una compra
export async function deletePurchase(id: number) {
    const sql = `DELETE FROM purchases WHERE id = ?`;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [id]);
        return result.changes;
    } catch (error) {
        console.error('Error al eliminar la compra:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

export async function getAllPurchase() {
    const sql = 'SELECT * FROM purchases';
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

export const purchaseDao = {
    createPurchase,
    getPurchasesByCustomer,
    deletePurchase,
    getAllPurchase
};