# TareaFy - Backend

Este es el backend de **TareaFy**, una API REST construida con **Node.js** y **Express**, diseñada para gestionar tareas pendientes. Este proyecto maneja autenticación de usuarios, operaciones CRUD de tareas, y envío de correos para confirmar cuentas.


## Installation

Instala todas las dependencias

```bash
  npm install
```

Luego renombra el archivo .env.example a sólo .env

cp .env.example .env

Luego completa los variables con tus credenciales

```bash
# Credenciales de la base de datos
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=tareafy_db
DB_PORT=3306

# Configuración de correo (Nodemailer)
EMAIL_HOST=smtp.ejemplo.com
EMAIL_PORT=587
EMAIL_USER=tu_correo@ejemplo.com
EMAIL_PASS=tu_contraseña_correo
EMAIL_FROM="TareaFy <no-responder@tareafy.com>"

# URL del frontend
FRONTEND_URL=http://localhost:5173

```


## Usage/Examples

Levanta el servidor en modo desarrollo
```bash
npm run dev
```

El servidor estará disponible por defecto en:
```bash
http://localhost:4000
```


## Funcionalidades

Registro y login de usuarios

Confirmación de cuentas por correo electrónico

CRUD de tareas por usuario autenticado

Middleware de autenticación con JWT

Validación de datos y manejo de errores