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
- **Estructura modular**: Cada carpeta en `src/` representa un módulo funcional

---

## 📦 Módulos activos

| Módulo           | Propósito                                                        | Estado         |
|------------------|------------------------------------------------------------------|----------------|
| `auth`           | Autenticación, emisión de token, protección por rol              | ✅ Validado    |
| `rrhh`           | Gestión de usuarios, roles, tareas y accesos                     | ✅ Integrado   |
| `configuracion`  | Registro institucional de empresa, parámetros, flags, impresoras | ✅ Operativo   |
| `api`            | Registro de sucursales con trazabilidad por usuario              | ✅ Funcional   |
| `auditoria`      | Consulta de accesos registrados por IP, módulo y usuario         | ✅ Activo      |

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
- [`api/README.md`](./api/README.md) → Registro de sucursales
- [`auditoria/README.md`](./auditoria/README.md) → Consulta de accesos registrados
- [`src/README.md`](./src/README.md) → Núcleo del backend, integración y arranque

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
- Usar `AccessLoggerInterceptor` para registrar accesos automáticamente
- Centralizar configuración en `ConfigModule` y `.env`

---

## 📌 Estado del backend

✅ Autenticación funcional  
✅ Módulo RRHH conectado y protegido  
✅ Módulo Configuración operativo y documentado  
✅ Módulo API funcional y trazable  
✅ Módulo Auditoría activo y consultable  
📄 Documentación activa por módulo  
🔒 Listo para trazabilidad y simulación operativa
```

