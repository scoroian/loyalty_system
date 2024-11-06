import {closeDb, open} from "./baseDao";

// Crear un nuevo cliente
export async function createCustomer(userId: number) {
    const sql = `
        INSERT INTO customers (id, userId)
        VALUES (?, ?)
    `;
    let db;
    try {
        db = await open();
        await db.run(sql, [userId, userId]);
        return userId; // El ID del cliente es el mismo que el del usuario
    } catch (error) {
        console.error('Error al crear el cliente:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Obtener un cliente por ID
export async function getCustomerById(id: number) {
    const sql = `SELECT * FROM customers WHERE id = ?`;
    let db;
    try {
        db = await open();
        const customer = await db.get(sql, [id]);
        return customer;
    } catch (error) {
        console.error('Error al obtener el cliente:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Actualizar información del cliente (si es necesario)
export async function updateCustomer(id: number, updates: any) {
    const { loyaltyLevel } = updates;
    const sql = `
        UPDATE customers
        SET loyaltyLevel = ?
        WHERE id = ?
    `;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [loyaltyLevel, id]);
        return result.changes; // Número de registros actualizados
    } catch (error) {
        console.error('Error al actualizar el cliente:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Eliminar un cliente
export async function deleteCustomer(id: number) {
    const sql = `DELETE FROM customers WHERE id = ?`;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [id]);
        return result.changes;
    } catch (error) {
        console.error('Error al eliminar el cliente:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

export async function getAllCustomers() {
    const sql = 'SELECT * FROM customers';
    let db;
    try {
        db = await open();
        const customers = await db.all(sql);
        return customers;
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        throw error;
    } finally {
        if (db) {
            await db.close();
        }
    }
}

export const customerDao = {
    createCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    getAllCustomers
};