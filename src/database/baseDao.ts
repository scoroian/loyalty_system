const sqlite3 = require('sqlite3').verbose();
const { open: sqliteOpen } = require('sqlite');
const path = require('path');

export async function open() {
    const db = await sqliteOpen({
        filename: path.join(__dirname, 'loyalty-system.db'),
        driver: sqlite3.Database
    });
    return db;
}

export async function exec(db: any, sql: string) {
    try {
        await db.exec(sql);
    } catch (error) {
        console.error('Error al ejecutar SQL:', error);
    }
}

export async function initializeDatabase() {
    try {
        const db = await open();

        // Tabla de usuarios (User)
        await exec(db, `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                contactDetails TEXT,
                role TEXT CHECK( role IN ('customer', 'business', 'admin') ) NOT NULL
            );
        `);

        // Tabla de clientes (Customer)
        await exec(db, `
            CREATE TABLE IF NOT EXISTS customers (
                id INTEGER PRIMARY KEY,
                userId INTEGER NOT NULL,
                FOREIGN KEY (id) REFERENCES users(id)
            );
        `);

        // Tabla de negocios (Business)
        await exec(db, `
            CREATE TABLE IF NOT EXISTS businesses (
                id INTEGER PRIMARY KEY,
                userId INTEGER NOT NULL,
                businessName TEXT NOT NULL,
                address TEXT NOT NULL,
                contactDetails TEXT,
                suspended INTEGER DEFAULT 0,
                FOREIGN KEY (id) REFERENCES users(id)
            );
        `);

        // Tabla de categorías de productos (ProductCategory)
        await exec(db, `
            CREATE TABLE IF NOT EXISTS product_categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                businessId INTEGER NOT NULL,
                name TEXT NOT NULL,
                FOREIGN KEY (businessId) REFERENCES businesses(id)
            );
        `);

        // Tabla de productos (Product)
        await exec(db, `
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                businessId INTEGER NOT NULL,
                categoryId INTEGER NOT NULL,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                description TEXT,
                stockLevel INTEGER NOT NULL,
                FOREIGN KEY (businessId) REFERENCES businesses(id),
                FOREIGN KEY (categoryId) REFERENCES product_categories(id)
            );
        `);

        // Tabla de recompensas (Reward)
        await exec(db, `
            CREATE TABLE IF NOT EXISTS rewards (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                businessId INTEGER NOT NULL,
                description TEXT NOT NULL,
                pointsRequired INTEGER NOT NULL,
                stock INTEGER NOT NULL,
                FOREIGN KEY (businessId) REFERENCES businesses(id)
            );
        `);

        // Tabla de compras (Purchase)
        await exec(db, `
            CREATE TABLE IF NOT EXISTS purchases (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                customerId INTEGER NOT NULL,
                businessId INTEGER NOT NULL,
                purchaseDate TEXT NOT NULL,
                totalAmount REAL NOT NULL,
                pointsEarned INTEGER NOT NULL,
                FOREIGN KEY (customerId) REFERENCES customers(id),
                FOREIGN KEY (businessId) REFERENCES businesses(id)
            );
        `);

        // Tabla de ítems de compra (PurchaseItem)
        await exec(db, `
            CREATE TABLE IF NOT EXISTS purchase_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                purchaseId INTEGER NOT NULL,
                productId INTEGER NOT NULL,
                quantity INTEGER NOT NULL,
                priceAtPurchase REAL NOT NULL,
                FOREIGN KEY (purchaseId) REFERENCES purchases(id),
                FOREIGN KEY (productId) REFERENCES products(id)
            );
        `);

        // Tabla de puntos (Points)
        await exec(db, `
            CREATE TABLE IF NOT EXISTS points (
                customerId INTEGER NOT NULL,
                businessId INTEGER NOT NULL,
                pointsAccumulated INTEGER NOT NULL,
                PRIMARY KEY (customerId, businessId),
                FOREIGN KEY (customerId) REFERENCES customers(id),
                FOREIGN KEY (businessId) REFERENCES businesses(id)
            );
        `);

        // Tabla de recompensas redimidas (RedeemedReward)
        await exec(db, `
            CREATE TABLE IF NOT EXISTS redeemed_rewards (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                customerId INTEGER NOT NULL,
                businessId INTEGER NOT NULL,
                rewardId INTEGER NOT NULL,
                redemptionDate TEXT NOT NULL,
                FOREIGN KEY (customerId) REFERENCES customers(id),
                FOREIGN KEY (businessId) REFERENCES businesses(id),
                FOREIGN KEY (rewardId) REFERENCES rewards(id)
            );
        `);

        // Tabla de reseñas (Review)
        await exec(db, `
            CREATE TABLE IF NOT EXISTS reviews (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                customerId INTEGER NOT NULL,
                businessId INTEGER NOT NULL,
                productId INTEGER,
                rating INTEGER NOT NULL,
                comment TEXT,
                date TEXT NOT NULL,
                response TEXT,
                FOREIGN KEY (customerId) REFERENCES customers(id),
                FOREIGN KEY (businessId) REFERENCES businesses(id),
                FOREIGN KEY (productId) REFERENCES products(id)
            );
        `);

        // Tabla de logros (Achievement)
        await exec(db, `
            CREATE TABLE IF NOT EXISTS achievements (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT NOT NULL,
                criteria TEXT NOT NULL,
                pointsAwarded INTEGER,
                specialRewards TEXT
            );
        `);

        // Tabla de logros de clientes (CustomerAchievement)
        await exec(db, `
            CREATE TABLE IF NOT EXISTS customer_achievements (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                customerId INTEGER NOT NULL,
                achievementId INTEGER NOT NULL,
                dateUnlocked TEXT NOT NULL,
                FOREIGN KEY (customerId) REFERENCES customers(id),
                FOREIGN KEY (achievementId) REFERENCES achievements(id)
            );
        `);

        console.log('Base de datos inicializada correctamente');
        return db;
    } catch (e) {
        console.error("Error al inicializar la base de datos: ", e);
    }
}

export async function closeDb({ db }: { db: any }) {
    try {
        if (db) {
            await db.close();
            console.log('Base de datos cerrada');
        }
    } catch (e) {
        console.error("Error al cerrar la base de datos: ", e);
    }
}
