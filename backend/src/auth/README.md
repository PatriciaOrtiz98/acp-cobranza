```md
# 🔐 Módulo Auth – ACP Cobranza

## 🧭 Propósito

Este módulo gestiona la autenticación, autorización y trazabilidad de accesos en el sistema ACP Cobranza. Permite validar credenciales, emitir tokens JWT, proteger rutas por rol y registrar cada acceso con contexto operativo.

---

## 📂 Estructura del módulo

| Archivo                          | Descripción                                                  |
|----------------------------------|--------------------------------------------------------------|
| `auth.controller.ts`            | Endpoint de login y entrega de token JWT                     |
| `auth.service.ts`               | Validación de credenciales y generación de token             |
| `jwt-strategy.ts`               | Estrategia Passport para validar token JWT                   |
| `jwt-auth.guard.ts`             | Guard para rutas protegidas con JWT                         |
| `auth.guard.ts`                 | Guard básico para validación manual de token                 |
| `roles.guard.ts`                | Validación de acceso por rol declarado                      |
| `roles.decorator.ts`            | Decorador `@Roles()` para declarar roles permitidos          |
| `access-loger.interceptor.ts`   | Interceptor que registra accesos en la tabla `rrhh.accesos`  |
| `types.ts`                      | Interface extendida `RequestWithUser` para contexto completo|
| `user-jwt.interface.ts`         | Payload del token JWT con sucursal y rol                     |
| `request-with-user-interface.ts`| Interface para extender `Request` con usuario autenticado    |

---

## 🔑 Autenticación

- **Endpoint**: `POST /auth/login`
- **Payload esperado**:
  ```json
  {
    "usuario": "nombre_usuario",
    "contrasenia": "clave_secreta"
  }
  ```
- **Respuesta**:
  ```json
  {
    "access_token": "jwt_token_firmado"
  }
  ```
- **Estrategia**: JWT firmado con `JWT_SECRET`
- **Expiración**: configurable vía `.env` (`JWT_EXPIRATION`)
- **Validación**: vía `bcrypt.compare()` contra contraseña cifrada con `pgcrypto`

---

## 🛡️ Autorización por rol

- **Decorador**: `@Roles('Administrador')`
- **Guard**: `RolesGuard` valida el rol desde el token
- **Roles**: definidos en la tabla `rrhh.roles` con jerarquía (`nivel`)
- **Ejemplo de uso**:
  ```ts
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Administrador')
  @Get('ruta-protegida')
  funcionProtegida() {
    // lógica...
  }
  ```

---

## 📋 Registro de accesos

- **Interceptor**: `AccessLoggerInterceptor`
- **Registra**: `usuario`, `rol`, `ip`, `módulo`, `fecha`
- **Destino**: tabla `rrhh.accesos`
- **Activación**:
  ```ts
  app.useGlobalInterceptors(new AccessLoggerInterceptor());
  ```
- **Uso recomendado**: solo en rutas protegidas si se desea trazabilidad selectiva

---

## 🧠 Estructura del token

```ts
{
  sub: 12,
  usuario: 'lsantos',
  rol: 'Administrador',
  sucursal: 3,
  nivel: 1 // opcional
}
```

---

## 🔗 Integración con otros módulos

- `rrhh`: consume roles y usuarios para validación
- `nomina`: usa rol y sucursal para cálculo de bonificaciones
- `auditoria`: consulta accesos registrados en `rrhh.accesos`
- `ventas`: valida permisos de conferencistas y vendedores

---

## ⚙️ Configuración `.env` requerida

```env
JWT_SECRET=TuClaveSecretaAqui
JWT_EXPIRATION=3600s
```

---

## 🧾 Cambios recientes

| Componente               | Cambio                            | Fecha       | Descripción                                                  |
|--------------------------|-----------------------------------|-------------|--------------------------------------------------------------|
| `AccessLoggerInterceptor`| Agregado y registrado globalmente | 2025-09-26  | Registra accesos en base de datos automáticamente            |
| `rrhh.accesos`           | Tabla creada para trazabilidad    | 2025-09-26  | Registro de cada acceso con usuario y contexto operativo     |
| `rol` en `rrhh.accesos`  | Restricción `NOT NULL` eliminada  | 2025-09-27  | Permite accesos sin rol definido temporalmente               |
| `nivel`                  | Agregado al token y registro      | 2025-09-27  | Permite jerarquías y validaciones avanzadas                 |

---

## 🧠 Recomendaciones técnicas

- Validar existencia de usuario y rol antes de emitir token
- Cifrar contraseñas con `pgcrypto` desde SQL:
  ```sql
  crypt(contrasenia, gen_salt('bf'))
  ```
- Indexar `fecha`, `usuario`, `modulo` en `rrhh.accesos` para rendimiento
- Usar `AccessLoggerInterceptor` solo en rutas protegidas si se desea trazabilidad selectiva
- Separar roles operativos (`Secretaria`, `Supervisor`) de administrativos (`Administrador`)
- Centralizar configuración en `.env` y `ConfigModule`

---

## 📌 Estado del módulo

✅ **Finalizado y validado**  
🔒 Listo para producción  
📄 Documentado y trazable
```

---
