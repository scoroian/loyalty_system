import {closeDb, open} from "./baseDao";

// Registrar una recompensa redimida
export async function redeemReward(redemption: any) {
    const { customerId, businessId, rewardId, redemptionDate } = redemption;
    const sql = `
        INSERT INTO redeemed_rewards (customerId, businessId, rewardId, redemptionDate)
        VALUES (?, ?, ?, ?)
    `;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [customerId, businessId, rewardId, redemptionDate]);
        return result.lastID;
    } catch (error) {
        console.error('Error al registrar la recompensa redimida:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Obtener recompensas redimidas por un cliente
export async function getRedeemedRewardsByCustomer(customerId: number) {
    const sql = `SELECT * FROM redeemed_rewards WHERE customerId = ?`;
    let db;
    try {
        db = await open();
        const rewards = await db.all(sql, [customerId]);
        return rewards;
    } catch (error) {
        console.error('Error al obtener las recompensas redimidas:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Eliminar una redención
export async function deleteRedeemedReward(id: number) {
    const sql = `DELETE FROM redeemed_rewards WHERE id = ?`;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [id]);
        return result.changes;
    } catch (error) {
        console.error('Error al eliminar la recompensa redimida:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

export async function getAllRedeemedRewards() {
    const sql = 'SELECT * FROM redeemed_rewards';
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

export const redeemedRewardDao = {
    redeemReward,
    getRedeemedRewardsByCustomer,
    deleteRedeemedReward,
    getAllRedeemedRewards
};