import {closeDb, open} from "./baseDao";

// Crear una nueva reseña
export async function createReview(review: any) {
    const { customerId, businessId, productId, rating, comment, date } = review;
    const sql = `
        INSERT INTO reviews (customerId, businessId, productId, rating, comment, date)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [customerId, businessId, productId, rating, comment, date]);
        return result.lastID;
    } catch (error) {
        console.error('Error al crear la reseña:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Obtener reseñas por negocio
export async function getReviewsByBusiness(businessId: number) {
    const sql = `SELECT * FROM reviews WHERE businessId = ?`;
    let db;
    try {
        db = await open();
        const reviews = await db.all(sql, [businessId]);
        return reviews;
    } catch (error) {
        console.error('Error al obtener las reseñas:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Actualizar una reseña (por ejemplo, para agregar respuesta del negocio)
export async function updateReview(id: number, updates: any) {
    const { response } = updates;
    const sql = `
        UPDATE reviews
        SET response = ?
        WHERE id = ?
    `;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [response, id]);
        return result.changes;
    } catch (error) {
        console.error('Error al actualizar la reseña:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Eliminar una reseña
export async function deleteReview(id: number) {
    const sql = `DELETE FROM reviews WHERE id = ?`;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [id]);
        return result.changes;
    } catch (error) {
        console.error('Error al eliminar la reseña:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

export async function getAllReviews() {
    const sql = 'SELECT * FROM reviews';
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

export const reviewDao = {
    createReview,
    getReviewsByBusiness,
    updateReview,
    deleteReview,
    getAllReviews
};