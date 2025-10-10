# 📘 Módulo Inventario 

## 🧱 Propósito

El módulo `inventario` permite registrar, consultar y auditar todos los elementos relacionados con el abastecimiento, recepción y movimiento de productos en la institución. Está diseñado para ser modular, trazable y reversible.

---

## 🧩 Entidades principales

| Entidad               | Descripción operativa                |
|-----------------------|--------------------------------------|
| Proveedor             | Fuente externa de productos          |
| Categoría             | Clasificación institucional          |
| Producto Unitario     | Ítem individual con stock            |
| Producto Compuesto    | Kit o agrupación de productos        |
| Detalle Compuesto     | Componentes de un producto compuesto |
| Orden de Compra       | Solicitud formal a proveedor         |
| Detalle Orden         | Ítems solicitados en la orden        |
| Recepción             | Registro de entrega física           |
| Movimiento            | Entrada/salida de inventario         |
| Detalle Movimiento    | Ítems involucrados en el movimiento  |

---

## 🔐 Seguridad

Todos los endpoints están protegidos por `JwtAuthGuard` y `RolesGuard`. Se requiere el rol `Administrador` para registrar, modificar o eliminar entidades.

```ts
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Administrador')
```

---

## 🔗 Endpoints por entidad

### Proveedor

- `POST /inventario/proveedores`
- `GET /inventario/proveedores`
- `PATCH /inventario/proveedores/:id`
- `DELETE /inventario/proveedores/:id`

### Categoría

- `POST /inventario/categorias`
- `GET /inventario/categorias`
- `PATCH /inventario/categorias/:id`
- `DELETE /inventario/categorias/:id`

### Producto Unitario

- `POST /inventario/productos-unitarios`
- `GET /inventario/productos-unitarios`
- `PATCH /inventario/productos-unitarios/:id`
- `DELETE /inventario/productos-unitarios/:id`

### Producto Compuesto

- `POST /inventario/productos-compuestos`
- `GET /inventario/productos-compuestos`
- `PATCH /inventario/productos-compuestos/:id`
- `DELETE /inventario/productos-compuestos/:id`

### Detalle Compuesto

- `POST /inventario/compuesto-detalle`
- `GET /inventario/compuesto-detalle`
- `DELETE /inventario/compuesto-detalle/:id`

### Orden de Compra

- `POST /inventario/ordenes`
- `GET /inventario/ordenes`
- `PATCH /inventario/ordenes/:id`
- `DELETE /inventario/ordenes/:id`

### Detalle Orden

- `POST /inventario/ordenes-detalle`
- `GET /inventario/ordenes-detalle`
- `DELETE /inventario/ordenes-detalle/:id`

### Recepción

- `POST /inventario/recepciones`
- `GET /inventario/recepciones`
- `DELETE /inventario/recepciones/:id`

### Movimiento

- `POST /inventario/movimientos`
- `GET /inventario/movimientos`
- `DELETE /inventario/movimientos/:id`

### Detalle Movimiento

- `POST /inventario/movimientos-detalle`
- `GET /inventario/movimientos-detalle`
- `DELETE /inventario/movimientos-detalle/:id`

---

## 🧪 Payloads de ejemplo

```json
// Proveedor
{
  "nombre": "Distribuidora Veracruz",
  "rfc": "DVE123456789",
  "telefono": "2281234567",
  "correo": "contacto@dve.com"
}

// Producto Unitario
{
  "nombre": "Cuaderno Profesional",
  "codigo": "CUA-001",
  "categoria": { "id_categoria": 5 },
  "proveedor": { "id_proveedor": 1 },
  "costo_unitario": 20.0,
  "precio_venta_publico": 35.5,
  "stock": 100
}
```

---

## 🧩 Flujo operativo recomendado

1. Registrar proveedor
2. Registrar categoría
3. Registrar producto unitario
4. Registrar orden de compra
5. Agregar detalle a la orden
6. Registrar recepción
7. Registrar movimiento de salida

---

## 🧱 Recomendaciones institucionales

- Validar cada operación con datos simulados antes de marcar como completa
- Mantener trazabilidad por usuario, fecha y entidad
- Evitar `update` en entidades irreversibles (recepción, movimiento)
- Documentar cada cambio en código y base de datos
- Usar migraciones para despliegue en producción

---
