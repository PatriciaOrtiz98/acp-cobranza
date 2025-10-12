---

## 📘 Módulo `nomina`

Gestión institucional de pagos, sueldos, créditos y auditoría para colaboradores. Este módulo centraliza la lógica de generación de nómina por usuario, con reversibilidad, trazabilidad y validación de roles.

---

### 🧱 Estructura del backend

```
src/
└── nomina/
    ├── nomina.module.ts
    ├── nomina.controller.ts
    ├── nomina.service.ts
    └── dto/
        ├── generar-pago.dto.ts
        ├── asignar-tipo-sueldo.dto.ts
        ├── registrar-credito.dto.ts
        ├── revertir-movimiento.dto.ts
        ├── auditar-credito.dto.ts
        └── consultar-historial.dto.ts
```

---

### 🔐 Validación institucional

- Todos los DTOs están tipados y listos para `class-validator`
- Cada endpoint espera estructura JSON explícita
- El backend está preparado para validación de rol (`Administrador`) si se activa en middleware

---

### 🚀 Endpoints disponibles

| Método | Ruta                          | Descripción                                      |
|--------|-------------------------------|--------------------------------------------------|
| POST   | `/nomina/generar-pago`        | Genera pagos por usuario según tipo de sueldo    |
| POST   | `/nomina/asignar-tipo-sueldo` | Asigna o actualiza el tipo de sueldo             |
| POST   | `/nomina/registrar-credito`   | Registra crédito institucional al empleado       |
| POST   | `/nomina/revertir-movimiento` | Marca movimiento como revertido                  |
| POST   | `/nomina/auditar-credito`     | Registra evento de auditoría sobre crédito       |
| POST   | `/nomina/consultar-historial` | Consulta movimientos filtrados por usuario/fecha |

---

### 🧠 Procedimientos SQL utilizados

- `nomina.generar_pago_por_usuario`
- `nomina.generar_pago_cambaceo`
- `nomina.generar_pago_conferencista`
- `nomina.generar_pago_gestor`
- `nomina.generar_bono_secretaria`
- `nomina.generar_sueldo_vendedor_lider`
- `nomina.generar_descuento_credito`

---

### 🧪 Pruebas recomendadas

- Postman: colección disponible con todos los endpoints
- Simulación: requiere datos en `ventas_*`, `tareas_secretaria`, `cartera_gestor`
- Reversión: probar con movimientos `reversible = TRUE`
- Auditoría: validar inserción en `creditos_empleado_auditoria`

---

### 📌 Pendientes opcionales

- Activar validación de rol por middleware
- Documentar en Swagger
- Agregar `class-validator` en DTOs
- Generar pruebas unitarias con Jest

---
