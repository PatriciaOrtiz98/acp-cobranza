# 📦 Módulo RRHH

Este módulo gestiona la estructura organizacional del sistema: usuarios, roles, tareas y trazabilidad de accesos.

## 🔐 Integración con Auth

Todos los endpoints están protegidos por `JwtAuthGuard` y `RolesGuard`. El token JWT emitido por `auth` incluye:

- `usuario`: nombre de usuario
- `rol`: nombre del rol
- `sucursal`: ID de sucursal

## 📊 Endpoints disponibles

### Usuarios

- `GET /rrhh/usuarios` → Listado completo de usuarios
- `GET /rrhh/usuarios/:id` → Datos del usuario por ID

### Roles

- `GET /rrhh/roles` → Listado de roles registrados

### Tareas

- `GET /rrhh/tareas` → Listado de tareas operativas

### Accesos

- `GET /rrhh/accesos` → Últimos accesos registrados (requiere rol `Administrador`)

## 🗄️ Tablas consultadas

- `rrhh.usuarios`
- `rrhh.roles`
- `rrhh.tareas`
- `rrhh.accesos`

## 🧱 Requisitos de acceso

Todos los endpoints requieren token válido y rol autorizado. Se recomienda usar Postman con el token generado por `POST /auth/login`.

## 🧠 Notas técnicas

- Este módulo no gestiona autenticación, solo estructura organizacional.
- Los accesos pueden ser registrados automáticamente mediante interceptor.
- El servicio `RrhhService` centraliza la lógica de consulta.
