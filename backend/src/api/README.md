```md
# 📘 Módulo API – Registro de Sucursales

Este módulo gestiona el registro de sucursales operativas dentro del sistema ACP Cobranza. Cada sucursal incluye datos geográficos, administrativos y de trazabilidad. El módulo está protegido por autenticación y registra al usuario que realiza cada alta.

---

## 📁 Estructura del módulo

```
src/api/
├── dto/
│   └── sucursal.dto.ts
├── entities/
│   └── sucursal.entity.ts
├── api.controller.ts
├── api.module.ts
└── api.service.ts
```

---

## 🧩 Entidad: `Sucursal`

```ts
@Entity({ schema: 'api', name: 'sucursales' })
export class Sucursal {
  id_sucursal: number;
  nombre: string;
  ciudad: string;
  estado: string;
  direccion: string;
  zona_horaria: string;
  codigo_interno: string;
  registrada_por: number;
  fecha_registro: Date;
}
```

---

## 📦 DTO: `SucursalDto`

```ts
export class SucursalDto {
  nombre: string;
  ciudad?: string;
  estado?: string;
  direccion?: string;
  zona_horaria?: string;
  codigo_interno: string;
}
```

---

## 🔐 Seguridad

- El endpoint está protegido por `AuthGuard`
- El campo `registrada_por` se completa automáticamente con el `id_usuario` autenticado
- El controlador espera un `RequestWithUser` con JWT válido

---

## 🔗 Endpoint disponible

| Método | Ruta               | Descripción               |
|--------|--------------------|---------------------------|
| POST   | `/api/sucursales`  | Crea una nueva sucursal   |

**Ejemplo de cuerpo:**

```json
{
  "nombre": "Sucursal Centro",
  "ciudad": "Xalapa",
  "estado": "Veracruz",
  "direccion": "Av. 20 de Noviembre #123",
  "zona_horaria": "America/Mexico_City",
  "codigo_interno": "SCEN001"
}
```

---

## 🧪 Validación en Postman

- Autenticarse con JWT válido
- Enviar el cuerpo como JSON
- Confirmar que el campo `registrada_por` se registra correctamente

---

## 🧱 Recomendaciones institucionales

- Validar unicidad de `codigo_interno` si se requiere
- Agregar endpoint `GET /api/sucursales` para listar sucursales si aplica
- Documentar esta entidad en `docs/sql/sucursales.sql`
- Registrar accesos si se desea trazabilidad completa

---

