# 🗃️ Actividades BD - NestJS API

**Sistema completo de ejercicios de Base de Datos con validaciones avanzadas**

Una API REST robusta construida con NestJS que implementa múltiples ejercicios de bases de datos relacionales con validaciones complejas, relaciones entre entidades y documentación interactiva con Swagger.

---

## 📋 Tabla de Contenidos

- [🚀 Características](#-características)
- [📖 Ejercicios Implementados](#-ejercicios-implementados)
- [🛠️ Tecnologías](#️-tecnologías)
- [⚡ Instalación y Configuración](#-instalación-y-configuración)
- [🗄️ Configuración de Base de Datos](#️-configuración-de-base-de-datos)
- [📚 Documentación API](#-documentación-api)
- [🧪 Testing](#-testing)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🔗 Endpoints](#-endpoints)

---

## 🚀 Características

✅ **Validaciones Avanzadas** - Validación de datos con class-validator  
✅ **Relaciones Complejas** - OneToMany, ManyToMany, ManyToOne  
✅ **Documentación Swagger** - API interactiva y documentada  
✅ **TypeORM** - ORM moderno con soporte PostgreSQL  
✅ **Manejo de Errores** - Respuestas de error consistentes  
✅ **Arquitectura Modular** - Código organizado por módulos  
✅ **Hot Reload** - Desarrollo eficiente con recarga automática

---

## 📖 Ejercicios Implementados

### 🛍️ **Ejercicio 1 - Registro de Productos (Merch)**

**Entidad:** `Merch`  
**Validaciones:**

- Nombre no vacío
- Precio mayor a 0
- Stock número entero positivo

**Endpoints:**

- `POST /merch` - Crear producto
- `GET /merch` - Listar productos
- `GET /merch/:id` - Obtener producto
- `PATCH /merch/:id` - Actualizar producto
- `DELETE /merch/:id` - Eliminar producto

### 📦 **Ejercicio 1A - Sistema de Órdenes**

**Entidades:** `Order`, `Client`, `Item`  
**Relaciones:** ManyToMany entre Order e Item, ManyToOne Order-Client  
**Validaciones:**

- Al menos 1 producto por orden
- Cliente debe existir
- Cálculo automático de monto total

**Endpoints:**

- `POST /orders` - Crear orden
- `GET /orders` - Listar órdenes con totales
- `GET /orders/:clientId` - Órdenes por cliente

### 👤 **Ejercicio 2 - Registro de Clientes Únicos**

**Entidad:** `Cliente`  
**Validaciones:**

- Email único a nivel de base de datos
- Formato de email válido
- Nombre no vacío

**Endpoints:**

- `POST /clientes` - Crear cliente
- `GET /clientes` - Listar clientes
- `GET /clientes/:id` - Obtener cliente
- `PUT /clientes/:id` - Actualizar cliente
- `DELETE /clientes/:id` - Eliminar cliente

### 📅 **Ejercicio 2A - Sistema de Reservas**

**Entidades:** `Reservation`, `Customer`  
**Validaciones Complejas:**

- Fecha fin posterior a fecha inicio
- Sin solapamiento de reservas por cliente
- Validación de fechas a nivel de entidad y servicio

**Endpoints:**

- `POST /reservations` - Crear reserva
- `GET /reservations` - Listar reservas
- `GET /reservations/reservation/:id` - Obtener reserva
- `GET /reservations/customer/:id` - Reservas por cliente

### ⭐ **Ejercicio 3A - Comentarios con Puntuación**

**Entidades:** `Comment`, `Product`  
**Relación:** ManyToOne Comment-Product, OneToMany Product-Comment  
**Validaciones:**

- Comentario máximo 200 caracteres
- Puntuación entre 1 y 5
- Producto debe existir

**Endpoints:**

- `POST /comments` - Crear comentario
- `GET /comments` - Listar comentarios con productos
- `GET /comments/:id` - Obtener comentario

---

## 🛠️ Tecnologías

| Tecnología          | Versión | Propósito           |
| ------------------- | ------- | ------------------- |
| **NestJS**          | ^10.0.0 | Framework backend   |
| **TypeORM**         | ^0.3.17 | ORM para PostgreSQL |
| **PostgreSQL**      | ^15     | Base de datos       |
| **class-validator** | ^0.14.0 | Validación de DTOs  |
| **Swagger**         | ^7.1.0  | Documentación API   |
| **TypeScript**      | ^5.1.3  | Lenguaje tipado     |

---

## ⚡ Instalación y Configuración

### 📋 Prerrequisitos

- Node.js 18+
- npm o yarn
- PostgreSQL 15+

### 🔧 Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone <repository-url>
cd actividades-bd

# 2. Instalar dependencias
npm install

# 3. Configurar base de datos (ver sección siguiente)

# 4. Ejecutar en desarrollo
npm run start:dev

# 5. Acceder a la API
# http://localhost:8000
# Swagger: http://localhost:8000/api
```

---

## 🗄️ Configuración de Base de Datos

### 1. **Crear Base de Datos PostgreSQL**

```sql
CREATE DATABASE clase6;
```

### 2. **Configurar Conexión**

El archivo `src/app.module.ts` ya está configurado:

```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '', // Cambiar por tu contraseña
  database: 'clase6',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // Solo para desarrollo
  logging: true,
});
```

### 3. **Variables de Entorno (Opcional)**

Crear `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_DATABASE=clase6
PORT=8000
```

---

## 📚 Documentación API

### 🌐 **Swagger UI**

**URL:** http://localhost:8000/api

La documentación interactiva incluye:

- 📝 Descripción de cada endpoint
- 🧪 Testing en vivo
- 📋 Esquemas de request/response
- ⚠️ Códigos de error documentados
- 💡 Ejemplos de uso

### 📊 **Organización por Ejercicios**

Los endpoints están organizados por ejercicio:

- **Ejercicio 1 - Merch** 🛍️
- **Ejercicio 1A - Orders** 📦
- **Ejercicio 2 - Clientes** 👤
- **Ejercicio 2A - Reservas** 📅
- **Ejercicio 3A - Comments** ⭐
- **Support Modules** 🔧

---

## 🧪 Testing

### 🔥 **Ejemplos de Requests**

#### **Crear Producto (Ejercicio 1)**

```bash
curl -X POST http://localhost:8000/merch \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Camiseta NestJS",
    "precio": 25.99,
    "stock": 50
  }'
```

#### **Crear Cliente Único (Ejercicio 2)**

```bash
curl -X POST http://localhost:8000/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan.perez@example.com"
  }'
```

#### **Crear Reserva con Validación (Ejercicio 2A)**

```bash
curl -X POST http://localhost:8000/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "startDate": "2025-02-01T14:00:00.000Z",
    "endDate": "2025-02-05T12:00:00.000Z",
    "customerId": 1
  }'
```

#### **Crear Comentario con Puntuación (Ejercicio 3A)**

```bash
curl -X POST http://localhost:8000/comments \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Excelente producto, muy recomendado!",
    "author": "María González",
    "rating": 5,
    "productId": 1
  }'
```

### ❌ **Testing de Validaciones**

#### **Error: Precio inválido**

```json
{
  "nombre": "Producto",
  "precio": 0, // ❌ Error: debe ser > 0
  "stock": 10
}
```

#### **Error: Email duplicado**

```json
{
  "nombre": "Carlos",
  "email": "juan.perez@example.com" // ❌ Error: email ya existe
}
```

#### **Error: Fechas inválidas**

```json
{
  "startDate": "2025-02-05T14:00:00.000Z",
  "endDate": "2025-02-01T14:00:00.000Z", // ❌ Error: fecha fin < inicio
  "customerId": 1
}
```

---

## 📁 Estructura del Proyecto

```
src/
├── 📁 merch/                 # Ejercicio 1 - Productos
│   ├── entities/
│   ├── dto/
│   ├── merch.controller.ts
│   ├── merch.service.ts
│   └── merch.module.ts
├── 📁 orders/                # Ejercicio 1A - Órdenes
├── 📁 clientes/              # Ejercicio 2 - Clientes únicos
├── 📁 reservations/          # Ejercicio 2A - Reservas
├── 📁 comments/              # Ejercicio 3A - Comentarios
├── 📁 products/              # Soporte para comentarios
├── 📁 customers/             # Soporte para reservas
├── 📁 clients/               # Soporte para órdenes
├── 📁 items/                 # Soporte para órdenes
├── app.module.ts             # Módulo principal
└── main.ts                   # Configuración Swagger
```

---

## 🔗 Endpoints

### 🛍️ **Merch (Ejercicio 1)**

| Método | Endpoint     | Descripción         |
| ------ | ------------ | ------------------- |
| POST   | `/merch`     | Crear producto      |
| GET    | `/merch`     | Listar productos    |
| GET    | `/merch/:id` | Obtener producto    |
| PATCH  | `/merch/:id` | Actualizar producto |
| DELETE | `/merch/:id` | Eliminar producto   |

### 📦 **Orders (Ejercicio 1A)**

| Método | Endpoint            | Descripción         |
| ------ | ------------------- | ------------------- |
| POST   | `/orders`           | Crear orden         |
| GET    | `/orders`           | Listar órdenes      |
| GET    | `/orders/:clientId` | Órdenes por cliente |

### 👤 **Clientes (Ejercicio 2)**

| Método | Endpoint        | Descripción        |
| ------ | --------------- | ------------------ |
| POST   | `/clientes`     | Crear cliente      |
| GET    | `/clientes`     | Listar clientes    |
| GET    | `/clientes/:id` | Obtener cliente    |
| PUT    | `/clientes/:id` | Actualizar cliente |
| DELETE | `/clientes/:id` | Eliminar cliente   |

### 📅 **Reservations (Ejercicio 2A)**

| Método | Endpoint                        | Descripción          |
| ------ | ------------------------------- | -------------------- |
| POST   | `/reservations`                 | Crear reserva        |
| GET    | `/reservations`                 | Listar reservas      |
| GET    | `/reservations/reservation/:id` | Obtener reserva      |
| GET    | `/reservations/customer/:id`    | Reservas por cliente |

### ⭐ **Comments (Ejercicio 3A)**

| Método | Endpoint        | Descripción        |
| ------ | --------------- | ------------------ |
| POST   | `/comments`     | Crear comentario   |
| GET    | `/comments`     | Listar comentarios |
| GET    | `/comments/:id` | Obtener comentario |

---

## 🎯 **Características Técnicas Destacadas**

### 🔒 **Validaciones Robustas**

- Validación a nivel de DTO y entidad
- Manejo de errores personalizados
- Validación de relaciones entre entidades

### 🗄️ **Diseño de Base de Datos**

- Relaciones bien definidas
- Índices únicos para emails
- Constraints de integridad referencial

### 📖 **Documentación Completa**

- Swagger interactivo
- Ejemplos de request/response
- Códigos de error documentados

### 🏗️ **Arquitectura Escalable**

- Separación por módulos
- DTOs para transferencia de datos
- Servicios reutilizables

---

## 🚀 **¡Empezar a Usar!**

1. **Instalar y configurar** siguiendo la sección de instalación
2. **Explorar la API** en http://localhost:8000/api
3. **Probar los ejercicios** con los ejemplos de testing
4. **Verificar las validaciones** intentando datos inválidos

**¡Disfruta explorando los ejercicios de bases de datos!** 🎉

---

## 📞 **Soporte**

Para preguntas o issues:

- 📖 Consultar la documentación Swagger
- 🧪 Probar ejemplos en la documentación interactiva
- 📋 Revisar logs de la aplicación para debugging

---

_Proyecto desarrollado con ❤️ usando NestJS y TypeORM_
