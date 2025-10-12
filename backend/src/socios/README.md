---

## 🧾 Módulo `socios` – ACP Cobranza

Este módulo gestiona el registro, venta, pago y trazabilidad de socios institucionales. Está diseñado con estándares de auditoría, reversibilidad y documentación institucional.

---

### 📦 Estructura del esquema SQL

| Componente                      | Descripción                                                                  |
|---------------------------------|------------------------------------------------------------------------------|
| `socios.socios`                 | Registro de socios con geolocalización, tipo y contacto                      |
| `socios.tipos_socio`            | Catálogo de tipos de socio                                                   |
| `socios.medios_pago`            | Catálogo de medios de pago institucional                                     |
| `socios.modalidades_pago`       | Catálogo de modalidades (contado, crédito)                                   |
| `socios.ventas_institucionales` | Registro de ventas con JSONB de productos y trazabilidad temporal            |
| `socios.pagos_conekta`          | Registro de pagos externos con trazabilidad completa                         |
| `socios.reversiones`            | Registro de reversiones con respaldo JSONB y motivo                          |

---

### ⚙️ Funciones SQL

| Función                                       | Propósito                                           |
|-----------------------------------------------|-----------------------------------------------------|
| `registrar_venta_institucional`               | Registrar venta con validación de rol               |
| `registrar_venta_con_pago`                    | Registrar venta + pago externo                      |
| `revertir_venta_institucional`                | Revertir venta con respaldo y trazabilidad          |
| `crear_tipo_socio` / `modificar` / `eliminar` | Mantenimiento de tipos de socio                     |
| `crear_medio_pago` / `modificar` / `eliminar` | Mantenimiento de medios de pago                     |

Todas las funciones validan que el usuario tenga rol `Administrador`.

---

### 🧠 Backend NestJS

#### 📁 `socios.service.ts`
- Métodos para invocar funciones SQL
- Validación de productos, claves foráneas y rol
- Registro de acceso institucional

#### 📁 `socios.controller.ts`
- Endpoints REST:
  - `POST /socios/registrar`
  - `POST /socios/venta`
  - `POST /socios/venta-conekta`
  - `POST /socios/revertir-venta`
  - `POST /socios/tipos-socio`
  - `PUT /socios/tipos-socio/:id`
  - `DELETE /socios/tipos-socio/:id`
  - `POST /socios/medios-pago`
  - `PUT /socios/medios-pago/:id`
  - `DELETE /socios/medios-pago/:id`

---

### ✅ Validaciones institucionales

- Rol `Administrador` requerido para todas las operaciones
- Validación de productos (`id_producto`, `cantidad`, `precio_unitario`)
- Validación de claves foráneas (`id_socio`, `id_modalidad`, `id_medio`)
- Trazabilidad con `registrarAcceso`
- Triggers automáticos para `fecha_modificacion` y `fecha_actualizacion`

---

### 🧪 Pruebas recomendadas

- Registrar socio con geolocalización
- Registrar venta institucional
- Registrar venta con pago externo
- Revertir venta
- Crear, modificar y eliminar tipos de socio
- Crear, modificar y eliminar medios de pago

---

### 📌 Recomendaciones futuras

- Agregar vista `vw_historial_socios` para trazabilidad consolidada
- Implementar eliminación lógica (`activo = FALSE`)
- Documentar en Swagger con ejemplos reales
- Agregar tests unitarios e integración

---