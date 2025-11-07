#🌿 Verde y Vital — API CRUD con Node.js, Express y MongoDB

📝 Descripción
Verde y Vital es una tienda de comida saludable que gestiona sus productos y categorías mediante una API RESTful desarrollada con Node.js, Express y MongoDB.
El proyecto implementa operaciones CRUD completas y una capa de servicios que separa la lógica de negocio del manejo de las rutas y controladores.

🧩 Estructura del Proyecto
tp-final/
├── .env
├── .env.example
├── .gitignore
├── package.json
├── index.js
└── src/
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── categoryController.js
    │   ├── productController.js
    │   └── userController.js
    ├── models/
    │   ├── categoryModel.js
    │   ├── productModel.js
    │   └── userModel.js
    ├── routes/
    │   ├── categoryRoute.js
    │   ├── productRoute.js
    │   └── userRoute.js
    └── services/
        ├── categoryService.js
        ├── productService.js
        └── userService.js


⚙️ Tecnologías Utilizadas
-Node.js
-Express.js
-MongoDB con Mongoose
-dotenv (variables de entorno)
-CORS

🚀 Instalación y Ejecución
1-Clonar el repositorio
    git clone https://github.com/Giuliana-raschia2004/tp-utn-final.git
    cd tp-final
2- Instalar dependencias
    npm install
3- Crear un archivo .env en la raíz del proyecto
4- Iniciar el servidor
    npm run dev
5- Correr el frontend
  cd src/client
  npm run dev

📍 Endpoints del Proyecto
🥦 Productos (/products)
-POST	/create	Crea un nuevo producto
-GET	/	Obtiene todos los productos
-PATCH	/update/:id	Actualiza un producto existente
-DELETE	/delete/:id	Elimina un producto por ID

🗂️ Categorías (/categories)
-POST	/create	Crea una nueva categoría
-GET	/	Obtiene todas las categorías
-PATCH	/update/:id	Actualiza una categoría existente
-DELETE	/delete/:id	Elimina una categoría por ID

👤 Usuarios (/users)
-GET	/	Obtiene todos los usuarios
-GET	/:id	Obtiene un usuario por ID
-POST	/create	Crea un nuevo usuario
-PATCH	/update/:id	Actualiza un usuario existente
-DELETE	/delete/:id	Elimina un usuario por ID


