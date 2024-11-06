import {closeDb, open} from "./baseDao";

// Crear un nuevo logro
export async function createAchievement(achievement: any) {
    const { name, description, criteria, pointsAwarded, specialRewards } = achievement;
    const sql = `
        INSERT INTO achievements (name, description, criteria, pointsAwarded, specialRewards)
        VALUES (?, ?, ?, ?, ?)
    `;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [name, description, criteria, pointsAwarded, specialRewards]);
        return result.lastID;
    } catch (error) {
        console.error('Error al crear el logro:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Obtener todos los logros
export async function getAllAchievements() {
    const sql = `SELECT * FROM achievements`;
    let db;
    try {
        db = await open();
        const achievements = await db.all(sql);
        return achievements;
    } catch (error) {
        console.error('Error al obtener los logros:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Actualizar un logro
export async function updateAchievement(id: number, updates: any) {
    const { name, description, criteria, pointsAwarded, specialRewards } = updates;
    const sql = `
        UPDATE achievements
        SET name = ?, description = ?, criteria = ?, pointsAwarded = ?, specialRewards = ?
        WHERE id = ?
    `;
     let db;
        try {
            db = await open();
        const result = await db.run(sql, [name, description, criteria, pointsAwarded, specialRewards, id]);
        return result.changes;
    } catch (error) {
        console.error('Error al actualizar el logro:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Eliminar un logro
export async function deleteAchievement(id: number) {
    const sql = `DELETE FROM achievements WHERE id = ?`;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [id]);
        return result.changes;
    } catch (error) {
        console.error('Error al eliminar el logro:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

export const achievementDao = {
    createAchievement,
    getAllAchievements,
    updateAchievement,
    deleteAchievement
};