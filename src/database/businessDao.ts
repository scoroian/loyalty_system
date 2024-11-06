import {closeDb, open} from "./baseDao";

// Crear un nuevo negocio
export async function createBusiness(business: any) {
    const { userId, businessName, address, contactDetails } = business;
    const sql = `
        INSERT INTO businesses (id, userId, businessName, address, contactDetails)
        VALUES (?, ?, ?, ?, ?)
    `;
    let db;
    try {
        db = await open();
        await db.run(sql, [userId, userId, businessName, address, contactDetails]);
        return userId; // El ID del negocio es el mismo que el del usuario
    } catch (error) {
        console.error('Error al crear el negocio:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Obtener un negocio por ID
export async function getBusinessById(id: number) {
    const sql = `SELECT * FROM businesses WHERE id = ?`;
    let db;
    try {
        db = await open();
        const business = await db.get(sql, [id]);
        return business;
    } catch (error) {
        console.error('Error al obtener el negocio:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Actualizar un negocio existente
export async function updateBusiness(id: number, updates: any) {
    const { businessName, address, contactDetails, suspended } = updates;
    const sql = `
        UPDATE businesses
        SET businessName = ?, address = ?, contactDetails = ?, suspended = ?
        WHERE id = ?
    `;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [businessName, address, contactDetails, suspended, id]);
        return result.changes;
    } catch (error) {
        console.error('Error al actualizar el negocio:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Eliminar un negocio
export async function deleteBusiness(id: number) {
    const sql = `DELETE FROM businesses WHERE id = ?`;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [id]);
        return result.changes;
    } catch (error) {
        console.error('Error al eliminar el negocio:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

export async function getAllBusinesses() {
    const sql = 'SELECT * FROM businesses';
    let db;
    try {
        db = await open();
        const businesses = await db.all(sql);
        return businesses;
    } catch (error) {
        console.error('Error al obtener los negocios:', error);
        throw error;
    } finally {
        if (db) {
            await db.close();
        }
    }
}

export const businessDao = {
    createBusiness,
    getBusinessById,
    updateBusiness,
    deleteBusiness,
    getAllBusinesses
};