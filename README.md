# EduPlanPro-backend

API y servidor backend de un sistema de gestión académica orientado a la administración de planes de estudio, programas de curso, usuarios, profesores, carreras, facultades, escuelas, roles, preferencias y reportes. Este backend está desarrollado íntegramente en **JavaScript** utilizando Node.js y Express.

## Características principales

- **Gestión de usuarios**: Registro, inicio de sesión, recuperación de contraseña, asignación de roles y preferencias.
- **Administración académica**: Manejo de planes de estudio, programas de curso, carreras, facultades y escuelas.
- **Gestión de profesores**: Registro, búsqueda y asignación de profesores a programas de curso.
- **Módulos de búsqueda avanzada**: Búsqueda de usuarios, profesores, carreras, programas de curso y planes de estudio.
- **Reportes**: Generación y consulta de reportes académicos.
- **Respaldo y recuperación**: Soporte para respaldos automáticos y recuperación de datos.
- **Papelera de reciclaje**: Para restaurar o eliminar definitivamente registros.
- **Preferencias de usuario**: Cada usuario puede definir y modificar sus preferencias.

## Instalación

1. **Clona el repositorio:**

    ```bash
    git clone https://github.com/brayrpgs/EduPlanPro-backend.git
    cd EduPlanPro-backend
    ```

2. **Instala las dependencias:**

    ```bash
    npm install
    ```

3. **Configura las variables de entorno:**

    - Crea un archivo `.env` con la configuración necesaria para la conexión a la base de datos y otros parámetros (puerto, claves, etc).

4. **Ejecuta el servidor:**

    ```bash
    npm start
    ```

    El servidor escuchará por defecto en `http://localhost:3001`.

## Uso

Este backend expone múltiples endpoints para la gestión de los distintos módulos académicos y administrativos. El sistema está preparado para trabajar con un frontend (por ejemplo, una aplicación en React en `localhost:3000`).

Algunos de los endpoints principales incluyen:

- `/users`
- `/teachers`
- `/careers`
- `/faculties`
- `/schools`
- `/studyplan`
- `/courseprogram`
- `/reports`
- `/preferences`
- `/recyclebin`

> **Nota:** Cada endpoint puede requerir autenticación mediante sesión.

## Estructura del proyecto

- `index.js`: Punto de entrada principal del servidor.
- `router/`: Contiene los módulos de rutas para los distintos recursos.
- `data/`: Lógica de acceso y manipulación de datos.
- `middlewares/`: Middlewares para manejo de sesión, CORS, logs, etc.
- `services/`: Servicios adicionales como backups.

Para mas detalles click [aqui](https://deepwiki.com/brayrpgs/EduPlanPro-Frontend)

