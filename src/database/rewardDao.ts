import {closeDb, open} from "./baseDao";
import {deleteRedeemedReward, getRedeemedRewardsByCustomer, redeemReward} from "./redeemedRewardDao";

// Crear una nueva recompensa
export async function createReward(reward: any) {
    const { businessId, description, pointsRequired, stock } = reward;
    const sql = `
        INSERT INTO rewards (businessId, description, pointsRequired, stock)
        VALUES (?, ?, ?, ?)
    `;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [businessId, description, pointsRequired, stock]);
        return result.lastID;
    } catch (error) {
        console.error('Error al crear la recompensa:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Obtener recompensas por negocio
export async function getRewardsByBusiness(businessId: number) {
    const sql = `SELECT * FROM rewards WHERE businessId = ?`;
    let db;
    try {
        db = await open();
        const rewards = await db.all(sql, [businessId]);
        return rewards;
    } catch (error) {
        console.error('Error al obtener las recompensas:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Actualizar una recompensa
export async function updateReward(id: number, updates: any) {
    const { description, pointsRequired, stock } = updates;
    const sql = `
        UPDATE rewards
        SET description = ?, pointsRequired = ?, stock = ?
        WHERE id = ?
    `;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [description, pointsRequired, stock, id]);
        return result.changes;
    } catch (error) {
        console.error('Error al actualizar la recompensa:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Eliminar una recompensa
export async function deleteReward(id: number) {
    const sql = `DELETE FROM rewards WHERE id = ?`;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [id]);
        return result.changes;
    } catch (error) {
        console.error('Error al eliminar la recompensa:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

export async function getAllReward() {
    const sql = 'SELECT * FROM rewards';
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

export const rewardDao = {
    createReward,
    getRedeemedRewardsByCustomer,
    updateReward,
    deleteReward,
    getAllReward
};