# Sistema de Fidelización para Pequeños Negocios

![Logo del Proyecto](https://github.com/scoroian/loyalty_system/blob/main/Logo.png)

## Índice

- [Descripción](#descripción)
- [Características Principales](#características-principales)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)

## Descripción

Este proyecto es un **Sistema de Fidelización** diseñado para pequeños negocios y sus clientes. Permite a los negocios gestionar productos, categorías y recompensas de fidelidad, mientras que los clientes pueden acumular y canjear puntos basados en sus compras.

## Características Principales

- **Registro de Usuarios**: Permite a los negocios y clientes registrarse en el sistema.
- **Gestión de Productos y Categorías**: Los negocios pueden crear y administrar categorías y productos.
- **Sistema de Puntos**: Los clientes acumulan puntos por sus compras según un sistema escalonado.
- **Vista del Cliente**: Los clientes pueden ver sus puntos, historial de compras y canjear recompensas.
- **Vista del Negocio**: Los negocios pueden ver detalles de los clientes y su historial de compras.
- **Reseñas y Feedback**: Los clientes pueden dejar reseñas y obtener puntos adicionales.
- **Gamificación**: Sistema de logros y competencias para aumentar el compromiso de los clientes.
- **Rol de Administrador**: Administradores pueden monitorear el sistema, suspender cuentas y gestionar logros.
- **Notificaciones y Programas de Referidos**: Opcionales, pero recomendados para mejorar la interacción.

## Tecnologías Utilizadas

- **Backend**: Node.js, TypeScript, **Express.js**
- **Base de Datos**: **sqlite3** (la base de datos se crea dentro del proyecto)
- **Autenticación**: JWT (JSON Web Tokens)
- **APIs REST**: Gestionadas y documentadas con Swagger/OpenAPI
- **Control de Versiones**: Git
- **Herramientas de Desarrollo**: ESLint, Prettier, Husky
- **CI/CD**: A configurar (Jenkins, GitHub Actions, etc.)

## Requisitos Previos

- **Node.js** v14 o superior
- **NPM** v6 o superior
- **Git** instalado en tu máquina

> **Nota**: No se requiere instalar una base de datos por separado, ya que **sqlite3** se crea y gestiona dentro del proyecto.

## Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/scoroian/loyalty_system.git
   
2. **Instalar dependencias**
	```bash
	npm install
	
## Estructura del Proyecto
	├── src
	│   ├── controllers
	│   ├── models
	│   ├── routes
	│   ├── services
	│   ├── middlewares
	│   ├── database
	│   │   └── database.sqlite
	│   ├── utils
	│   └── main.ts
	├── data
	│   └── database.sqlite
	├── package.json
	├── tsconfig.json
	└── README.md
- **controllers**: Controladores que manejan las peticiones y respuestas.
- **models**: Modelos de datos y esquemas de la base de datos.
- **routes**: Definición de rutas y endpoints de la API.
- **services**: Lógica de negocio y servicios.
- **middlewares**: Middlewares para autenticación, validación, etc.
- **database**: Configuración de la base de datos y migraciones (si aplicable).
- **utils**: Funciones y utilidades comunes.
- **data**: Carpeta donde se almacenará el archivo de la base de datos sqlite.
- **main.ts**: Punto de entrada de la aplicación.
