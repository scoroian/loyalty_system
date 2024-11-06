import {closeDb, open} from './baseDao';

// Crear un nuevo usuario
export async function createUser(user: any) {
    const { name, email, password, contactDetails, role } = user;
    const sql = `
        INSERT INTO users (name, email, password, contactDetails, role)
        VALUES (?, ?, ?, ?, ?)
    `;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [name, email, password, contactDetails, role]);
        return result.lastID; // Devuelve el ID del nuevo usuario
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Obtener un usuario por ID
export async function getUserById(id: number) {
    const sql = `SELECT * FROM users WHERE id = ?`;
    let db;
    try {
        db = await open();
        const user = await db.get(sql, [id]);
        return user;
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Actualizar un usuario existente
export async function updateUser(id: number, updates: any) {
    const { name, email, password, contactDetails, role } = updates;
    const sql = `
        UPDATE users
        SET name = ?, email = ?, password = ?, contactDetails = ?, role = ?
        WHERE id = ?
    `;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [name, email, password, contactDetails, role, id]);
        return result.changes; // Número de registros actualizados
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

// Eliminar un usuario
export async function deleteUser(id: number) {
    const sql = `DELETE FROM users WHERE id = ?`;
    let db;
    try {
        db = await open();
        const result = await db.run(sql, [id]);
        return result.changes; // Número de registros eliminados
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

export async function getAllUsers() {
    const sql = 'SELECT * FROM users';
    let db;
    try {
        db = await open();
        const users = await db.all(sql);
        return users;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    } finally {
        if (db) {
            await db.close();
        }
    }
}

export const userDao = {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers
};