Perfecto, Patricia. Vamos a completar tu `README.md` institucional del backend incluyendo el módulo `configuracion`, que ya está validado, documentado y operativo. Aquí tienes la versión extendida y final, lista para producción:

---

## 📁 ACP Cobranza Backend

```md
# 🧱 ACP Cobranza – Backend Modular

Este backend implementa una arquitectura modular, auditable y escalable para el sistema ACP Cobranza. Cada módulo representa una unidad funcional del negocio, con autenticación, trazabilidad, control de acceso y conexión directa a la base de datos.

---

## 🧭 Arquitectura general

- **Framework base**: NestJS
- **Base de datos**: PostgreSQL
- **ORM/Driver**: Prisma + consultas SQL directas
- **Autenticación**: JWT con roles y sucursales
- **Protección de rutas**: Guards por token y rol
- **Trazabilidad**: Interceptor de accesos operativos

---

## 📦 Módulos activos

| Módulo         | Propósito                                                        | Estado         |
|----------------|------------------------------------------------------------------|----------------|
| `auth`         | Autenticación, emisión de token, protección por rol              | ✅ Validado   |
| `rrhh`         | Gestión de usuarios, roles, tareas y accesos                     | ✅ Integrado  |
| `configuracion`| Registro institucional de empresa, parámetros, flags, impresoras | ✅ Operativo  |

---

## 🔐 Flujo de autenticación

1. `POST /auth/login` → valida credenciales y emite token JWT
2. Token incluye: `usuario`, `rol`, `sucursal`, `nivel`
3. Rutas protegidas usan `JwtAuthGuard` y `RolesGuard`
4. Accesos registrados en `rrhh.accesos` vía interceptor

---

## 🛡️ Convenciones de seguridad

- Todas las rutas sensibles deben usar:
  ```ts
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Administrador')
  ```
- El token debe enviarse en el header:
  ```
  Authorization: Bearer <access_token>
  ```

---

## 📋 Documentación por módulo

- [`auth/README.md`](./auth/README.md) → Login, guards, interceptor, token
- [`rrhh/README.md`](./rrhh/README.md) → Usuarios, roles, tareas, accesos
- [`configuracion/README.md`](./configuracion/README.md) → Empresa, parámetros, flags, impresoras

---

## ⚙️ Configuración `.env` mínima

```env
JWT_SECRET=TuClaveSecretaAqui
JWT_EXPIRATION=3600s
```

---

## 🧠 Recomendaciones técnicas

- Validar credenciales contra `rrhh.usuarios`
- Cifrar contraseñas con `pgcrypto` o `bcrypt`
- Indexar campos clave en `rrhh.accesos` para trazabilidad
- Documentar cada módulo con su propio `README.md`
- Simular flujos operativos antes de activar en producción
- Separar configuración institucional de operación diaria

---

## 📌 Estado del backend

✅ Autenticación funcional  
✅ Módulo RRHH conectado y protegido  
✅ Módulo Configuración operativo y documentado  
📄 Documentación activa por módulo  
🔒 Listo para trazabilidad y simulación operativa
```
---
