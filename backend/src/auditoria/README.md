```md
# 📘 Módulo Auditoría – Registro y Consulta de Accesos

Este módulo permite consultar los accesos registrados en el sistema ACP Cobranza. Cada acceso incluye trazabilidad por usuario, rol, IP, módulo accedido y fecha. Está protegido por autenticación y roles, y permite filtros dinámicos por fecha, usuario y módulo.

---

## 📁 Estructura del módulo

```
src/auditoria/
└── accesos.controller.ts
```

---

## 🧩 Fuente de datos

Los accesos se registran en la tabla `rrhh.accesos`, que incluye:

- `id`: Identificador único
- `usuario`: Nombre de usuario que accedió
- `rol`: Rol del usuario en el momento del acceso
- `ip`: Dirección IP del cliente
- `modulo`: Módulo accedido (ej. `configuracion.roles`)
- `fecha`: Fecha y hora del acceso

---

## 🔐 Seguridad

- El controlador está protegido por `JwtAuthGuard` y `RolesGuard`
- Solo los roles `Administrador` y `Supervisor` pueden consultar accesos
- Los filtros son opcionales y se aplican vía `@Query`

---

## 🔗 Endpoint disponible

| Método | Ruta              | Descripción                        |
|--------|-------------------|------------------------------------|
| GET    | `/auth/accesos`   | Consulta los últimos 100 accesos   |

### Parámetros opcionales:

- `desde`: Fecha mínima (`YYYY-MM-DD`)
- `hasta`: Fecha máxima (`YYYY-MM-DD`)
- `usuario`: Nombre exacto del usuario
- `modulo`: Fragmento del nombre del módulo (`ILIKE`)

**Ejemplo de consulta:**

```
GET /auth/accesos?desde=2025-10-01&usuario=admin&modulo=configuracion
```

---

## 🧪 Validación en Postman

- Autenticarse con JWT válido como `Administrador` o `Supervisor`
- Probar con y sin filtros
- Confirmar que los resultados están ordenados por fecha descendente

---

## 🧱 Recomendaciones institucionales

- Registrar accesos en cada acción crítica usando `INSERT INTO rrhh.accesos(...)`
- Agregar paginación si se requiere más de 100 registros
- Documentar esta tabla en `docs/sql/accesos.sql`
- Integrar esta consulta en dashboards de monitoreo o auditoría

---

