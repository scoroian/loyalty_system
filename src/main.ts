import { initializeDatabase, closeDb } from './database/baseDao';

// Importamos los DAOs
import { userDao } from './database/userDao';
import { customerDao } from './database/customerDao';
import { businessDao } from './database/businessDao';
import { productCategoryDao } from './database/productCategoryDao';
import { productDao } from './database/productDao';
import { rewardDao } from './database/rewardDao';
import { purchaseDao } from './database/purchaseDao';
import { purchaseItemDao } from './database/purchaseItemDao';
import { pointsDao } from './database/pointsDao';
import { redeemedRewardDao } from './database/redeemedRewardDao';
import { reviewDao } from './database/reviewDao';
import { achievementDao } from './database/achievementDao';
import { customerAchievementDao } from './database/customerAchievementDao';

/*
async function insertarDatosDePrueba() {
    const db = await initializeDatabase();

    try {
        // Crear usuarios
        // Clientes: Sebas, Inés, Raquel
        // Negocios: Miguel, Javi, David
        // Admins: Fernando, Antonio

        // Crear usuarios clientes
        const sebasUserId = await userDao.createUser({
            name: 'Sebas',
            email: 'sebas@example.com',
            password: 'password123', // Recuerda encriptar las contraseñas en un entorno real
            contactDetails: '555-1234',
            role: 'customer'
        });
        const inesUserId = await userDao.createUser({
            name: 'Inés',
            email: 'ines@example.com',
            password: 'password123',
            contactDetails: '555-5678',
            role: 'customer'
        });
        const raquelUserId = await userDao.createUser({
            name: 'Raquel',
            email: 'raquel@example.com',
            password: 'password123',
            contactDetails: '555-8765',
            role: 'customer'
        });

        // Crear registros de clientes
        await customerDao.createCustomer(sebasUserId);
        await customerDao.createCustomer(inesUserId);
        await customerDao.createCustomer(raquelUserId);

        // Crear usuarios negocios
        const miguelUserId = await userDao.createUser({
            name: 'Miguel',
            email: 'miguel@example.com',
            password: 'password123',
            contactDetails: '555-4321',
            role: 'business'
        });
        const javiUserId = await userDao.createUser({
            name: 'Javi',
            email: 'javi@example.com',
            password: 'password123',
            contactDetails: '555-6789',
            role: 'business'
        });
        const davidUserId = await userDao.createUser({
            name: 'David',
            email: 'david@example.com',
            password: 'password123',
            contactDetails: '555-9876',
            role: 'business'
        });

        // Crear registros de negocios
        await businessDao.createBusiness({
            userId: miguelUserId,
            businessName: 'Tienda de Miguel',
            address: 'Calle Principal 123',
            contactDetails: 'contacto@tiendademiguel.com'
        });
        await businessDao.createBusiness({
            userId: javiUserId,
            businessName: 'Boutique de Javi',
            address: 'Avenida Central 456',
            contactDetails: 'info@boutiquedejavi.com'
        });
        await businessDao.createBusiness({
            userId: davidUserId,
            businessName: 'Electrónicos David',
            address: 'Plaza Mayor 789',
            contactDetails: 'soporte@electronicosdavid.com'
        });

        // Crear usuarios administradores
        const fernandoUserId = await userDao.createUser({
            name: 'Fernando',
            email: 'fernando@example.com',
            password: 'password123',
            contactDetails: '555-1111',
            role: 'admin'
        });
        const antonioUserId = await userDao.createUser({
            name: 'Antonio',
            email: 'antonio@example.com',
            password: 'password123',
            contactDetails: '555-2222',
            role: 'admin'
        });

        // Crear categorías de productos para los negocios
        const categoriaElectronicaMiguel = await productCategoryDao.createProductCategory({
            businessId: miguelUserId,
            name: 'Electrónica'
        });
        const categoriaRopaJavi = await productCategoryDao.createProductCategory({
            businessId: javiUserId,
            name: 'Ropa'
        });
        const categoriaGadgetsDavid = await productCategoryDao.createProductCategory({
            businessId: davidUserId,
            name: 'Gadgets'
        });

        // Crear productos para los negocios
        const productoTelefono = await productDao.createProduct({
            businessId: miguelUserId,
            categoryId: categoriaElectronicaMiguel,
            name: 'Teléfono Inteligente',
            price: 299.99,
            description: 'Un teléfono inteligente de última generación.',
            stockLevel: 50
        });
        const productoCamiseta = await productDao.createProduct({
            businessId: javiUserId,
            categoryId: categoriaRopaJavi,
            name: 'Camiseta de Moda',
            price: 19.99,
            description: 'Camiseta con diseño moderno.',
            stockLevel: 100
        });
        const productoAuriculares = await productDao.createProduct({
            businessId: davidUserId,
            categoryId: categoriaGadgetsDavid,
            name: 'Auriculares Inalámbricos',
            price: 49.99,
            description: 'Auriculares con cancelación de ruido.',
            stockLevel: 75
        });

        // Crear recompensas para los negocios
        const recompensaDescuentoMiguel = await rewardDao.createReward({
            businessId: miguelUserId,
            description: 'Descuento de 10%',
            pointsRequired: 100,
            stock: 20
        });
        const recompensaRegaloJavi = await rewardDao.createReward({
            businessId: javiUserId,
            description: 'Accesorio de regalo',
            pointsRequired: 50,
            stock: 30
        });
        const recompensaEnvioGratisDavid = await rewardDao.createReward({
            businessId: davidUserId,
            description: 'Envío Gratis en la próxima compra',
            pointsRequired: 75,
            stock: 25
        });

        // Simular compras y acumulación de puntos
        // Sebas compra en la tienda de Miguel
        const compraSebas1Id = await purchaseDao.createPurchase({
            customerId: sebasUserId,
            businessId: miguelUserId,
            purchaseDate: new Date().toISOString(),
            totalAmount: 300, // €300
            pointsEarned: 0 // Calcularemos más adelante
        });

        // Añadir ítems a la compra de Sebas
        await purchaseItemDao.addPurchaseItem({
            purchaseId: compraSebas1Id,
            productId: productoTelefono,
            quantity: 1,
            priceAtPurchase: 299.99
        });

        // Calcular puntos ganados por Sebas
        const pointsSebas = calculatePoints(300);
        // Actualizar puntos ganados en la compra
        await db.run(
            'UPDATE purchases SET pointsEarned = ? WHERE id = ?',
            [pointsSebas, compraSebas1Id]
        );

        // Actualizar puntos acumulados por Sebas en la tienda de Miguel
        await pointsDao.updatePoints(sebasUserId, miguelUserId, pointsSebas);

        // Inés compra en la boutique de Javi
        const compraInes1Id = await purchaseDao.createPurchase({
            customerId: inesUserId,
            businessId: javiUserId,
            purchaseDate: new Date().toISOString(),
            totalAmount: 60, // €60
            pointsEarned: 0 // Calcularemos más adelante
        });

        // Añadir ítems a la compra de Inés
        await purchaseItemDao.addPurchaseItem({
            purchaseId: compraInes1Id,
            productId: productoCamiseta,
            quantity: 3,
            priceAtPurchase: 19.99
        });

        // Calcular puntos ganados por Inés
        const pointsInes = calculatePoints(60);
        // Actualizar puntos ganados en la compra
        await db.run(
            'UPDATE purchases SET pointsEarned = ? WHERE id = ?',
            [pointsInes, compraInes1Id]
        );

        // Actualizar puntos acumulados por Inés en la boutique de Javi
        await pointsDao.updatePoints(inesUserId, javiUserId, pointsInes);

        // Raquel compra en Electrónicos David
        const compraRaquel1Id = await purchaseDao.createPurchase({
            customerId: raquelUserId,
            businessId: davidUserId,
            purchaseDate: new Date().toISOString(),
            totalAmount: 50, // €50
            pointsEarned: 0 // Calcularemos más adelante
        });

        // Añadir ítems a la compra de Raquel
        await purchaseItemDao.addPurchaseItem({
            purchaseId: compraRaquel1Id,
            productId: productoAuriculares,
            quantity: 1,
            priceAtPurchase: 49.99
        });

        // Calcular puntos ganados por Raquel
        const pointsRaquel = calculatePoints(50);
        // Actualizar puntos ganados en la compra
        await db.run(
            'UPDATE purchases SET pointsEarned = ? WHERE id = ?',
            [pointsRaquel, compraRaquel1Id]
        );

        // Actualizar puntos acumulados por Raquel en Electrónicos David
        await pointsDao.updatePoints(raquelUserId, davidUserId, pointsRaquel);

        // Los clientes redimen recompensas
        // Sebas redime una recompensa en la tienda de Miguel
        const sebasPoints = await pointsDao.getPoints(sebasUserId, miguelUserId);
        if (sebasPoints >= 100) {
            // Restar puntos y actualizar stock de la recompensa
            await redeemedRewardDao.redeemReward({
                customerId: sebasUserId,
                businessId: miguelUserId,
                rewardId: recompensaDescuentoMiguel,
                redemptionDate: new Date().toISOString()
            });
            // Actualizar puntos de Sebas
            await pointsDao.updatePoints(sebasUserId, miguelUserId, -100);
            // Actualizar stock de la recompensa
            await db.run(
                'UPDATE rewards SET stock = stock - 1 WHERE id = ?',
                [recompensaDescuentoMiguel]
            );
        }

        // Los clientes dejan reseñas
        await reviewDao.createReview({
            customerId: sebasUserId,
            businessId: miguelUserId,
            productId: productoTelefono,
            rating: 5,
            comment: 'Excelente producto y servicio.',
            date: new Date().toISOString()
        });

        await reviewDao.createReview({
            customerId: inesUserId,
            businessId: javiUserId,
            productId: productoCamiseta,
            rating: 4,
            comment: 'Me encantó la calidad de la ropa.',
            date: new Date().toISOString()
        });

        // Administradores crean logros
        const logroComprasMes = await achievementDao.createAchievement({
            name: 'Comprador Frecuente',
            description: 'Realiza 5 compras en un mes.',
            criteria: '5 compras en un mes',
            pointsAwarded: 50,
            specialRewards: null
        });

        const logroPrimerCanje = await achievementDao.createAchievement({
            name: 'Primer Canje',
            description: 'Redime tu primera recompensa.',
            criteria: 'primer canje de recompensa',
            pointsAwarded: 20,
            specialRewards: null
        });

        // Los clientes desbloquean logros (simulando que cumplen los criterios)
        await customerAchievementDao.unlockAchievement(
            sebasUserId,
            logroPrimerCanje,
            new Date().toISOString()
        );

        // Actualizar puntos por logro desbloqueado
        await pointsDao.updatePoints(sebasUserId, miguelUserId, 20); // Sebas recibe 20 puntos extra

        console.log('Datos de prueba insertados correctamente.');

    } catch (error) {
        console.error('Error durante la inserción de datos de prueba:', error);
    } finally {
        await closeDb({ db });
    }
}

insertarDatosDePrueba();
*/

async function main() {
    try {
        // Obtener y mostrar todos los usuarios
        const users = await userDao.getAllUsers();
        console.log('Usuarios:');
        console.table(users);

        // Obtener y mostrar todos los clientes
        const customers = await customerDao.getAllCustomers();
        console.log('Clientes:');
        console.table(customers);

        // Obtener y mostrar todos los negocios
        const businesses = await businessDao.getAllBusinesses();
        console.log('Negocios:');
        console.table(businesses);

        // Obtener y mostrar todas las categorías de productos
        const categories = await productCategoryDao.getAllProductCategory();
        console.log('Categorías de Productos:');
        console.table(categories);

        // Obtener y mostrar todos los productos
        const products = await productDao.getAllProducts();
        console.log('Productos:');
        console.table(products);

        // Obtener y mostrar todas las recompensas
        const rewards = await rewardDao.getAllReward();
        console.log('Recompensas:');
        console.table(rewards);

        // Obtener y mostrar todas las compras
        const purchases = await purchaseDao.getAllPurchase();
        console.log('Compras:');
        console.table(purchases);

        // Obtener y mostrar todos los ítems de compra
        const purchaseItems = await purchaseItemDao.getAllPurchaseItem();
        console.log('Ítems de Compra:');
        console.table(purchaseItems);

        // Obtener y mostrar todos los registros de puntos
        const points = await pointsDao.getAllPoints();
        console.log('Puntos:');
        console.table(points);

        // Obtener y mostrar todas las recompensas redimidas
        const redeemedRewards = await redeemedRewardDao.getAllRedeemedRewards();
        console.log('Recompensas Redimidas:');
        console.table(redeemedRewards);

        // Obtener y mostrar todas las reseñas
        const reviews = await reviewDao.getAllReviews();
        console.log('Reseñas:');
        console.table(reviews);

        // Obtener y mostrar todos los logros
        const achievements = await achievementDao.getAllAchievements();
        console.log('Logros:');
        console.table(achievements);

        // Obtener y mostrar todos los logros de los clientes
        const customerAchievements = await customerAchievementDao.getAllCustomerAchievement();
        console.log('Logros de Clientes:');
        console.table(customerAchievements);

    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

main();

// Función para calcular puntos según el monto de la compra
function calculatePoints(amount: number): number {
    let points = 0;
    if (amount <= 50) {
        points += amount * 1;
    } else if (amount <= 200) {
        points += 50 * 1; // Los primeros €50
        points += (amount - 50) * 2; // De €51 a €200
    } else if (amount <= 1000) {
        points += 50 * 1; // Los primeros €50
        points += 150 * 2; // De €51 a €200
        points += (amount - 200) * 3; // De €201 a €1000
    } else {
        points += 50 * 1;
        points += 150 * 2;
        points += 800 * 3;
        points += (amount - 1000) * 4;
    }
    return Math.floor(points);
}


