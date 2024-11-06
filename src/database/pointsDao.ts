import {closeDb, open} from "./baseDao";

// Actualizar puntos acumulados de un cliente en un negocio
export async function updatePoints(customerId: number, businessId: number, pointsToAdd: number) {
    const selectSql = `SELECT pointsAccumulated FROM points WHERE customerId = ? AND businessId = ?`;
    const insertSql = `
        INSERT INTO points (customerId, businessId, pointsAccumulated)
        VALUES (?, ?, ?)
    `;
    const updateSql = `
        UPDATE points
        SET pointsAccumulated = ?
        WHERE customerId = ? AND businessId = ?
    `;
    let db;
    try {
        db = await open();
        const row = await db.get(selectSql, [customerId, businessId]);
        if (row) {
            const newTotal = row.pointsAccumulated + pointsToAdd;
            await db.run(updateSql, [newTotal, customerId, businessId]);
        } else {
            await db.run(insertSql, [customerId, businessId, pointsToAdd]);
        }
    } catch (error) {
        console.error('Error al actualizar los puntos:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Obtener puntos de un cliente en un negocio
export async function getPoints(customerId: number, businessId: number) {
    const sql = `SELECT pointsAccumulated FROM points WHERE customerId = ? AND businessId = ?`;
    let db;
    try {
        db = await open();
        const row = await db.get(sql, [customerId, businessId]);
        return row ? row.pointsAccumulated : 0;
    } catch (error) {
        console.error('Error al obtener los puntos:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

export async function getAllPoints() {
    const sql = 'SELECT * FROM points';
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

export const pointsDao = {
    updatePoints,
    getPoints,
    getAllPoints
};