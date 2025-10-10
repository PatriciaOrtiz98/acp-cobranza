# Módulo de Ventas

Este módulo gestiona todas las operaciones relacionadas con ventas dentro del sistema ACP Cobranza.
## 🧭 Propósito

El módulo `ventas` gestiona todas las operaciones comerciales del sistema ACP Cobranza. Permite registrar ventas, administrar detalles de venta, procesar pagos de clientes, gestionar parámetros comerciales y realizar integraciones con Conekta. Está diseñado para ser modular, auditable y trazable, con seguridad por rol y submódulos independientes.

---

## 📂 Estructura del módulo

```
src/ventas/
├── detalles-venta.controller.ts
├── detalles-venta.entity.ts
├── detalles-venta.module.ts
├── detalles-venta.service.ts
├── pagos-cliente.controller.ts
├── pagos-cliente.entity.ts
├── pagos-cliente.module.ts
├── pagos-cliente.service.ts
├── pagos-conekta.ts
├── parametros.controller.ts
├── parametros.entity.ts
├── parametros.module.ts
├── parametros.service.ts
├── ventas.controller.ts
├── ventas.dto.ts
├── ventas.entity.ts
├── ventas.module.ts
├── ventas.service.ts
└── README.md
```

---

## 🧩 Submódulos incluidos

| Submódulo            | Descripción operativa                                         |
|----------------------|---------------------------------------------------------------|
| `ventas`             | Registro y administración de ventas                           |
| `detalles-venta`     | Gestión de productos y servicios asociados a cada venta       |
| `pagos-cliente`      | Registro y vinculación de pagos realizados por clientes       |
| `pagos-conekta`      | Integración y procesamiento de pagos vía Conekta              |
| `parametros`         | Administración de parámetros comerciales y configuraciones    |

---

## 📦 DTOs y entidades principales

| Archivo/DTO                  | Uso principal                                         |
|------------------------------|-------------------------------------------------------|
| `ventas.dto.ts`              | Alta y edición de ventas                              |
| `ventas.entity.ts`           | Estructura de datos de venta                          |
| `detalles-venta.entity.ts`   | Estructura de productos/servicios por venta           |
| `pagos-cliente.entity.ts`    | Registro de pagos realizados por clientes             |
| `parametros.entity.ts`       | Configuración y parámetros comerciales                |

---

## 🔐 Seguridad

- Todos los controladores usan `JwtAuthGuard` y `RolesGuard`
- Roles permitidos: `Administrador`, `Vendedor`, `Supervisor`
- Campos como `usuario`, `id_usuario`, `id_sucursal` se extraen del token
- Operaciones críticas se registran para auditoría y trazabilidad

---

## 🔗 Endpoints activos

### Ventas

| Método | Ruta                   | Descripción                          |
|--------|------------------------|--------------------------------------|
| GET    | `/ventas`              | Listar ventas                        |
| POST   | `/ventas`              | Registrar nueva venta                |
| GET    | `/ventas/:id`          | Consultar venta por ID               |
| PATCH  | `/ventas/:id`          | Modificar venta                      |
| DELETE | `/ventas/:id`          | Eliminar venta                       |

### Detalles de Venta

| Método | Ruta                              | Descripción                          |
|--------|-----------------------------------|--------------------------------------|
| GET    | `/detalles-venta`                 | Listar detalles de venta             |
| POST   | `/detalles-venta`                 | Agregar detalle a venta              |
| GET    | `/detalles-venta/:id`             | Consultar detalle por ID             |
| PATCH  | `/detalles-venta/:id`             | Modificar detalle de venta           |
| DELETE | `/detalles-venta/:id`             | Eliminar detalle de venta            |

### Pagos de Cliente

| Método | Ruta                              | Descripción                          |
|--------|-----------------------------------|--------------------------------------|
| GET    | `/pagos-cliente`                  | Listar pagos de clientes             |
| POST   | `/pagos-cliente`                  | Registrar pago de cliente            |
| GET    | `/pagos-cliente/:id`              | Consultar pago por ID                |
| PATCH  | `/pagos-cliente/:id`              | Modificar pago de cliente            |
| DELETE | `/pagos-cliente/:id`              | Eliminar pago de cliente             |

### Pagos Conekta

| Método | Ruta                              | Descripción                          |
|--------|-----------------------------------|--------------------------------------|
| POST   | `/pagos-conekta`                  | Procesar pago vía Conekta            |

### Parámetros

| Método | Ruta                              | Descripción                          |
|--------|-----------------------------------|--------------------------------------|
| GET    | `/parametros`                     | Listar parámetros comerciales        |
| POST   | `/parametros`                     | Registrar nuevo parámetro            |
| PATCH  | `/parametros/:id`                 | Modificar parámetro                  |
| DELETE | `/parametros/:id`                 | Eliminar parámetro                   |

---

## 🧠 Lógica del servicio (`VentasService` y submódulos)

| Método                      | Descripción                                         |
|-----------------------------|-----------------------------------------------------|
| `listarVentas()`            | Consulta de ventas registradas                      |
| `crearVenta()`              | Alta de venta con validación                        |
| `modificarVenta()`          | Edición de datos de venta                           |
| `eliminarVenta()`           | Eliminación lógica o física de venta                |
| `listarDetallesVenta()`     | Consulta de detalles asociados a ventas             |
| `agregarDetalleVenta()`     | Agregar producto/servicio a venta                   |
| `modificarDetalleVenta()`   | Edición de detalle de venta                         |
| `eliminarDetalleVenta()`    | Eliminación de detalle de venta                     |
| `listarPagosCliente()`      | Consulta de pagos realizados por clientes           |
| `registrarPagoCliente()`    | Registro de pago de cliente                         |
| `modificarPagoCliente()`    | Edición de pago de cliente                          |
| `eliminarPagoCliente()`     | Eliminación de pago de cliente                      |
| `procesarPagoConekta()`     | Procesamiento de pago vía Conekta                   |
| `listarParametros()`        | Consulta de parámetros comerciales                  |
| `crearParametro()`          | Alta de parámetro comercial                         |
| `modificarParametro()`      | Edición de parámetro                                |
| `eliminarParametro()`       | Eliminación de parámetro                            |

---

## 🧠 Recomendaciones operativas

- Validar existencia de cliente y productos antes de registrar venta
- Registrar pagos solo si la venta está activa
- Sincronizar datos entre ventas, detalles y pagos para consistencia
- Documentar cada flujo en su respectivo `README.md`
- Indexar `fecha`, `cliente`, `producto` en reportes para rendimiento
- Auditar operaciones críticas y pagos electrónicos

---

## 📂 Ubicación del código

- Carpeta principal: `src/ventas/`
- Documentación: `docs/ventas/`
- DTOs y entidades: `src/ventas/`
- Servicio: `src/ventas/ventas.service.ts`, `detalles-venta.service.ts`, `pagos-cliente.service.ts`, `parametros.service.ts`
- Controladores: `ventas.controller.ts`, `detalles-venta.controller.ts`, `pagos-cliente.controller.ts`, `parametros.controller.ts`
- Módulo: `src/ventas/ventas.module.ts`, `detalles-venta.module.ts`, `pagos-cliente.module.ts`, `parametros.module.ts`

---

## 📌 Estado del módulo

✅ Estructura modular y clara  
🔒 Seguridad activa por token y rol  
📄 Documentado y trazable  
🧱 Listo para producción y auditoría
