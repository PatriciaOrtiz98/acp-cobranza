---

## 📘 Módulo `punto_equilibrio`

Simulación institucional del punto de equilibrio por producto, usuario y periodo. Este módulo permite registrar escenarios, agregar gastos fijos y variables, calcular utilidad neta y consultar simulaciones históricas. Está integrado con el módulo `nomina` para validar sostenibilidad operativa.

---

### 🧱 Estructura del backend

```
src/
└── punto-equilibrio/
    ├── punto-equilibrio.module.ts
    ├── punto-equilibrio.controller.ts
    ├── punto-equilibrio.service.ts
    └── dto/
        ├── registrar-simulacion.dto.ts
        ├── agregar-gasto.dto.ts
        ├── calcular-utilidad.dto.ts
        └── consultar-simulaciones.dto.ts
```

---

### 🔐 Validación institucional

- DTOs estructurados y listos para `class-validator`
- Acceso controlado por `generado_por` (usuario responsable)
- Integración con `nomina.movimientos` para gasto real de nómina
- Preparado para trazabilidad y reversión futura

---

### 🚀 Endpoints disponibles

| Método | Ruta                                       | Descripción                                       |
|--------|--------------------------------------------|---------------------------------------------------|
| POST   | `/punto-equilibrio/registrar-simulacion`   | Registra una simulación con parámetros base       |
| POST   | `/punto-equilibrio/agregar-gasto`          | Agrega gasto fijo o variable a una simulación     |
| POST   | `/punto-equilibrio/calcular-utilidad`      | Calcula utilidad neta de una simulación           |
| POST   | `/punto-equilibrio/consultar-simulaciones` | Consulta simulaciones filtradas por usuario/fecha |

---

### 🧠 Procedimientos y funciones SQL utilizadas

- `punto_equilibrio.registrar_simulacion`
- `punto_equilibrio.calcular_utilidad(p_id_simulacion INT)`
- Tablas:
  - `punto_equilibrio.simulaciones`
  - `punto_equilibrio.gastos`

---

### 🧪 Pruebas recomendadas

- Postman: colección disponible con todos los endpoints
- Simulación: registrar producto, unidades y precio
- Gastos: agregar fijos y variables
- Cálculo: validar utilidad contra ingresos y costos
- Historial: consultar por usuario y periodo

---

### 📌 Pendientes opcionales

- Activar validación de rol por middleware
- Documentar en Swagger
- Agregar reversión y auditoría de simulaciones
- Generar pruebas unitarias con Jest

---
