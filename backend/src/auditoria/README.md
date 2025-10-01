```md
# 📊 Módulo Auditoría – ACP Cobranza

Este módulo permite consultar los accesos registrados en el sistema, ofreciendo trazabilidad operativa por usuario, fecha, IP y módulo. Es clave para supervisión, control interno y validación de actividad.

---

## 🧭 Propósito

- Consultar accesos registrados por el interceptor `AccessLoggerInterceptor`
- Filtrar por fecha, usuario, módulo, IP o rol
- Validar actividad operativa por rol y módulo
- Apoyar auditorías internas y revisiones de seguridad

---

## 📂 Estructura del módulo

| Archivo                  | Descripción                                 |
|--------------------------|---------------------------------------------|
| `accesos.controller.ts`  | Endpoint para consultar accesos registrados |

---

## 🔐 Seguridad

- Ruta protegida por `JwtAuthGuard` y `RolesGuard`
- Acceso permitido solo a roles: `Administrador`, `Supervisor`
- Token requerido en el header:
  ```
  Authorization: Bearer <access_token>
  ```

---

## 📋 Endpoint disponible

### `GET /auth/accesos`

Consulta los últimos 100 accesos registrados. Permite filtros opcionales:

| Parámetro | Tipo     | Descripción                              |
|-----------|----------|------------------------------------------|
| `desde`   | `string` | Fecha mínima (`YYYY-MM-DD`)              |
| `hasta`   | `string` | Fecha máxima (`YYYY-MM-DD`)              |
| `usuario` | `string` | Usuario exacto                           |
| `modulo`  | `string` | Módulo parcial (`ILIKE`)                 |

#### Ejemplo:

```
GET /auth/accesos?desde=2025-09-01&usuario=lsantos&modulo=rrhh
```

---

## 🗄️ Tabla consultada

- `rrhh.accesos`

| Campo     | Tipo     | Descripción                      |
|-----------|----------|----------------------------------|
| `id`      | `serial` | Identificador único              |
| `usuario` | `text`   | Usuario que accedió              |
| `rol`     | `text`   | Rol del usuario                  |
| `ip`      | `text`   | Dirección IP                     |
| `modulo`  | `text`   | Ruta o módulo accedido           |
| `fecha`   | `timestamp` | Fecha y hora del acceso       |

---

## 🔗 Integración con otros módulos

- **`auth`**: registra accesos automáticamente mediante interceptor
- **`rrhh`**: define roles y usuarios que acceden al sistema
- **`ventas`, `nomina`, `auditoria`**: pueden consultar accesos por módulo

---

## 🧠 Recomendaciones técnicas

- Indexar `fecha`, `usuario`, `modulo` en `rrhh.accesos` para rendimiento
- Agregar paginación (`offset`, `limit`) si se requiere histórico completo
- Exportar resultados a CSV si se desea trazabilidad externa
- Validar que el interceptor esté activo en rutas protegidas

---

## 📌 Estado del módulo

✅ Funcional y conectado  
🔒 Protegido por roles  
📄 Documentado y trazable  
📊 Listo para auditoría operativa
```

---
