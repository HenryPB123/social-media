# 📱 Social App- Imitación de una Red Social

Esta aplicación es una imitación de una red social en la que los usuarios pueden registrarse, iniciar sesión y realizar diversas interacciones como crear, editar y eliminar publicaciones, seguir y dejar de seguir a otros usuarios, dar "me gusta" y "no me gusta" a los posts y editar su perfil.

## 🚀 Características principales

- Registro e inicio de sesión.
- CRUD de usuarios y publicaciones.
- Seguir y dejar de seguir a otros usuarios.
- Dar "me gusta" y "no me gusta" a los posts.
- Ver los posts de un usuario específico.
- Editar el perfil del usuario.

---

## 🛠 Tecnologías utilizadas

### Backend:

- **Node.js** con **Express.js**.
- **MySQL** como base de datos.
- **bcryptjs** para encriptación de contraseñas.
- **jsonwebtoken** para autenticación con tokens.
- **multer** para manejo de archivos.
- **dotenv** para manejo de variables de entorno.

### Frontend:

- **React.js** con **Vite**.
- **React Router DOM** para la navegación.
- **MUI (Material-UI)** con **SASS** para estilos.
- **Styled Components** para estilos personalizados.
- **Axios** para realizar peticiones HTTP.
- **React Query** para manejo de datos y caché.
- **Moment.js** para formateo de fechas.

---

## 🔧 Instalación y configuración

### 1️⃣ Clonar el repositorio

```sh
  git clone https://github.com/tu-usuario/tu-repositorio.git
  cd tu-repositorio
```

### 2️⃣ Configurar el backend

```sh
  cd api
  npm install
```

Crear un archivo `.env` en la carpeta `api` con las siguientes variables:

```env
PORT=5000
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_de_tu_base_de_datos
SECRET_KEY=tu_clave_secreta
```

Ejecutar el backend:

```sh
  npm start
```

### 3️⃣ Configurar el frontend

```sh
  cd ../client
  npm install
```

Ejecutar el frontend:

```sh
  npm run dev
```

---

## 🚀 Uso

1. Regístrate o inicia sesión.
2. Explora publicaciones y sigue a otros usuarios.
3. Crea, edita o elimina tus propias publicaciones.
4. Da "me gusta" o "no me gusta" a los posts.
5. Edita tu perfil y personaliza tu información.

---

## 📜 Licencia

Este proyecto es de código abierto y está bajo la licencia MIT.
