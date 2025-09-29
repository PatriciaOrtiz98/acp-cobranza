```md
# 🔐 Módulo Auth – ACP Cobranza

## 🧭 Propósito
Este módulo gestiona la autenticación, autorización y trazabilidad de accesos en el sistema ACP Cobranza. Permite validar credenciales, emitir tokens JWT, proteger rutas por rol y registrar cada acceso con contexto operativo.

---

## 📂 Estructura del módulo

| Archivo | Descripción |
|--------|-------------|
| `auth.controller.ts` | Endpoint de login y validación de token |
| `auth.service.ts` | Generación de JWT, validación de usuario |
| `jwt.strategy.ts` | Estrategia de autenticación basada en JWT |
| `roles.guard.ts` | Protección de rutas según rol |
| `roles.decorator.ts` | Decorador `@Roles()` para definir acceso |
| `access-loger.interceptor.ts` | Interceptor que registra accesos en la base de datos |

---

## 🔑 Autenticación

- Endpoint: `POST /auth/login`
- Payload esperado: `{ usuario, contrasenia }`
- Respuesta: `{ access_token }`
- Estrategia: JWT firmado con `JWT_SECRET`
- Expiración configurable vía `.env`

---

## 🛡️ Autorización por rol

- Decorador: `@Roles('Administrador')`
- Guard: `RolesGuard` valida el rol desde el token
- Roles definidos en tabla `rrhh.roles` con jerarquía (`nivel`)

---

## 📋 Registro de accesos

- Interceptor: `AccessLoggerInterceptor`
- Registra: `usuario`, `rol`, `ip`, `modulo`, `fecha`
- Tabla destino: `rrhh.accesos`
- Activación: registrada globalmente en `main.ts`

---

## 🧠 Estructura del token

```ts
{
  usuario: 'lsantos',
  rol: 'Administrador',
  sucursal: 3,
  nivel: 1 // opcional
}
```

---

## 🔗 Integración con otros módulos

- `rrhh`: consume roles y usuarios
- `nomina`: usa rol y sucursal para cálculo de bonificaciones
- `auditoria`: consulta accesos registrados
- `ventas`: valida permisos de conferencistas y vendedores

---

## 🧾 Cambios recientes

| Componente | Cambio | Fecha |
|------------|--------|-------|
| `AccessLoggerInterceptor` | Agregado y registrado globalmente | 2025-09-26 |
| `rrhh.accesos` | Tabla creada para trazabilidad | 2025-09-26 |
| `rol` en `rrhh.accesos` | Restricción `NOT NULL` eliminada | 2025-09-27 |
| `nivel` | Agregado al token y registro (opcional) | 2025-09-27 |

---

## 🧠 Recomendaciones técnicas

- Validar existencia de usuario y rol antes de emitir token
- Cifrar contraseñas con `pgcrypto` (`crypt(contrasenia, gen_salt('bf'))`)
- Indexar `fecha`, `usuario`, `modulo` en `rrhh.accesos` para rendimiento
- Usar `AccessLoggerInterceptor` solo en rutas protegidas si se desea trazabilidad selectiva

---

## 📌 Estado del módulo

✅ **Finalizado y validado**  
🔒 Listo para producción  
📄 Documentado y trazable
