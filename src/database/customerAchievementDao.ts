import {closeDb, open} from "./baseDao";

// Registrar un logro desbloqueado por un cliente
export async function unlockAchievement(customerId: number, achievementId: number, dateUnlocked: string) {
    const sql = `
        INSERT INTO customer_achievements (customerId, achievementId, dateUnlocked)
        VALUES (?, ?, ?)
    `;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [customerId, achievementId, dateUnlocked]);
        return result.lastID;
    } catch (error) {
        console.error('Error al registrar el logro del cliente:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Obtener logros desbloqueados por un cliente
export async function getAchievementsByCustomer(customerId: number) {
    const sql = `
        SELECT a.* FROM achievements a
        INNER JOIN customer_achievements ca ON a.id = ca.achievementId
        WHERE ca.customerId = ?
    `;
    let db;
    try {
        db = await open();
        const achievements = await db.all(sql, [customerId]);
        return achievements;
    } catch (error) {
        console.error('Error al obtener los logros del cliente:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

export async function getAllCustomerAchievement() {
    const sql = 'SELECT * FROM customer_achievements';
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

export const customerAchievementDao = {
    unlockAchievement,
    getAchievementsByCustomer,
    getAllCustomerAchievement
};
