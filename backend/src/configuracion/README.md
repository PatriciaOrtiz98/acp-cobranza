
---

## 📘 `docs/configuracion/README.md`

```md
# ⚙️ Módulo de Configuración

## 📦 Descripción
El módulo `configuracion` centraliza todos los elementos institucionales que definen el comportamiento del sistema ACP Cobranza. Aquí se registran entidades operativas, parámetros, flags, dispositivos físicos y asignaciones, con trazabilidad completa por sucursal y usuario.

Este módulo permite separar la configuración del entorno operativo, facilitando simulaciones, validaciones y auditoría institucional.

---

## 🧩 Submódulos incluidos

| Submódulo                                         | Descripción operativa                                       |
|---------------------------------------------------|-------------------------------------------------------------|
| [`empresa`](empresa.md)                           | Registro de la entidad operadora del sistema                |
| [`impresoras`](impresoras.md)                     | Registro de impresoras físicas por sucursal                 |
| [`impresora-asignacion`](impresora-asignacion.md) | Asignación de impresoras a módulos operativos               |
| [`parametros`](parametros.md)                     | Configuración de valores operativos                         |
| [`parametros-versionados`](parametros.md)         | Historial de cambios en parámetros                          |
| [`flags`](flags.md)                               | Activación/desactivación de funcionalidades específicas     |

---

## 🔐 Seguridad

- Todos los endpoints requieren token JWT
- Los campos `id_usuario` y `id_sucursal` se extraen automáticamente del token
- Roles permitidos: `Administrador`, `Supervisor` (según configuración)

---

## 🧠 Recomendaciones institucionales

- Toda configuración debe ser trazable, auditable y reversible
- Los registros deben simularse antes de activarse en producción
- Documentar cada flujo en su respectivo `README.md`
- Validar claves compuestas para evitar duplicidad física o lógica

---

## 📂 Ubicación del código

- Carpeta principal: `src/configuracion/`
- Documentación: `docs/configuracion/`
- Entidades: `src/configuracion/entities/`
- DTOs: `src/configuracion/dto/`
- Servicio: `src/configuracion/configuracion.service.ts`
- Controlador: `src/configuracion/configuracion.controller.ts`

---
