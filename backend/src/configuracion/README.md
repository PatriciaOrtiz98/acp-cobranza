```md
# ⚙️ Módulo de Configuración – ACP Cobranza

## 📦 Descripción

El módulo `configuracion` centraliza todos los elementos institucionales que definen el comportamiento del sistema ACP Cobranza. Aquí se registran entidades operativas, parámetros, flags, dispositivos físicos y asignaciones, con trazabilidad completa por sucursal y usuario.

Este módulo permite separar la configuración del entorno operativo, facilitando simulaciones, validaciones y auditoría institucional. Está diseñado para ser modular, versionado y reversible.

---

## 📂 Estructura del módulo

```
src/configuracion/
├── dto/
│   ├── empresa.dto.ts
│   ├── flags.dto.ts
│   ├── impresora-asignacion.dto.ts
│   ├── impresoras.dto.ts
│   ├── parametros-versionados.dto.ts
│   └── parametros.dto.ts
├── entities/
│   ├── empresa.entity.ts
│   ├── flags.entity.ts
│   ├── impresora-asignacion.entity.ts
│   ├── impresoras.entity.ts
│   ├── parametros-versionados.entity.ts
│   └── parametros.entity.ts
├── configuracion.controller.ts
├── configuracion.module.ts
└── configuracion.service.ts
```

---

## 🧩 Submódulos incluidos

| Submódulo                                         | Descripción operativa                                       |
|--------------------------------------------------|-------------------------------------------------------------|
| [`empresa`](empresa.md)                          | Registro de la entidad operadora del sistema                |
| [`impresoras`](impresoras.md)                    | Registro de impresoras físicas por sucursal                 |
| [`impresora-asignacion`](impresora-asignacion.md)| Asignación de impresoras a módulos operativos               |
| [`parametros`](parametros.md)                    | Configuración de valores operativos                         |
| [`parametros-versionados`](parametros-versionados.md)| Historial de cambios en parámetros                      |
| [`flags`](flags.md)                              | Activación/desactivación de funcionalidades específicas     |

---

## 🧩 Entidades clave

| Entidad                    | Descripción                                                  |
|---------------------------|--------------------------------------------------------------|
| `empresa`                 | Datos institucionales de la empresa                          |
| `flags`                   | Activadores y switches del sistema                           |
| `impresoras`              | Registro de impresoras disponibles                           |
| `impresora_asignacion`    | Relación entre impresoras y usuarios por módulo              |
| `parametros`              | Configuración general editable                               |
| `parametros_versionados`  | Historial de parámetros con trazabilidad por versión         |

---

## 📦 DTOs utilizados

| DTO                         | Uso principal                                               |
|----------------------------|-------------------------------------------------------------|
| `EmpresaDto`               | Alta y edición de datos institucionales                     |
| `FlagDto`                  | Activación de switches del sistema                          |
| `ImpresoraDto`             | Registro de impresoras                                      |
| `ImpresoraAsignacionDto`   | Asignación de impresoras por usuario y módulo               |
| `ParametroDto`             | Edición de parámetros generales                             |
| `ParametroVersionadoDto`   | Registro de cambios con versión y usuario                   |

---

## 🔐 Seguridad

- Todos los endpoints requieren token JWT
- Los campos `id_usuario` y `id_sucursal` se extraen automáticamente del token
- Roles permitidos: `Administrador`, `Supervisor` (según configuración)
- Controlador protegido por `AuthGuard`
- Campos como `actualizado_por` y `registrado_por` se completan automáticamente desde el token

---

## 🔗 Endpoints disponibles

| Método | Ruta                                 | Descripción                                      |
|--------|--------------------------------------|--------------------------------------------------|
| POST   | `/configuracion/empresa`             | Registrar o actualizar datos de empresa          |
| GET    | `/configuracion/parametros`          | Consultar parámetros actuales                    |
| POST   | `/configuracion/parametros`          | Actualizar parámetro                             |
| POST   | `/configuracion/parametros/versionado`| Versionar parámetro con trazabilidad             |
| GET    | `/configuracion/flags`               | Consultar flags activos                          |
| POST   | `/configuracion/flags`               | Activar o desactivar flag                        |
| POST   | `/configuracion/impresoras`          | Registrar impresora física                       |
| POST   | `/configuracion/impresoras/asignacion`| Asignar impresora a usuario por módulo           |
| POST   | `/configuracion/roles`               | Crear rol institucional (vía RRHH)               |
| GET    | `/configuracion/roles`               | Consultar roles activos (vía RRHH)               |

---

## 🧠 Lógica del servicio (`ConfiguracionService`)

| Método                      | Descripción                                                                 |
|----------------------------|------------------------------------------------------------------------------|
| `registrarEmpresa()`       | Registra datos institucionales con trazabilidad (`registrado_por`)          |
| `listarParametros()`       | Consulta todos los parámetros activos                                       |
| `actualizarParametro()`    | Actualiza un parámetro existente                                            |
| `versionarParametro()`     | Registra una nueva versión de parámetro con fecha de inicio y auditoría     |
| `listarFlags()`            | Consulta todos los flags del sistema                                        |
| `actualizarFlag()`         | Activa o desactiva un flag institucional                                    |
| `registrarImpresora()`     | Registra una impresora con sucursal y usuario responsable                   |
| `asignarImpresora()`       | Asigna una impresora a un usuario por módulo y tipo de uso (`tickets`, etc.)|

---

## 🧠 Recomendaciones institucionales

- Toda configuración debe ser trazable, auditable y reversible
- Simular registros antes de activarlos en producción
- Versionar parámetros críticos antes de sobrescribir valores
- Validar claves compuestas para evitar duplicidad física o lógica
- Indexar `fecha_inicio`, `clave`, `modulo` en tablas operativas
- Documentar cada flujo en su respectivo `README.md`
- Usar `class-validator` en DTOs si se requiere validación estricta
- Registrar accesos críticos con `AccessLoggerInterceptor` si aplica

---

## 🔗 Integración con otros módulos

- `rrhh`: consumo de roles y usuarios para trazabilidad
- `auth`: uso de token para completar campos operativos
- `ventas`: uso de parámetros y flags para lógica de negocio
- `nomina`: uso de parámetros versionados para cálculo institucional

---

## 📂 Ubicación del código

- Carpeta principal: `src/configuracion/`
- Documentación: `docs/configuracion/`
- Entidades: `src/configuracion/entities/`
- DTOs: `src/configuracion/dto/`
- Servicio: `src/configuracion/configuracion.service.ts`
- Controlador: `src/configuracion/configuracion.controller.ts`
- Módulo: `src/configuracion/configuracion.module.ts`

---

## 📌 Estado del módulo

✅ Estructura modular y clara  
🔒 Seguridad activa por token  
📄 Documentado y trazable  
🧱 Listo para producción y auditoría
```

