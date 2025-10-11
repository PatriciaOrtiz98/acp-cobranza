# 📘 Módulo Rutas

## 🧱 Propósito

El módulo `rutas` permite planificar, ejecutar y auditar las visitas operativas de gestores a clientes asignados. Está diseñado para ser modular, trazable, reversible y compatible con visualización geográfica. Incluye la creación de rutas, asignación de clientes, registro de pasos, generación de cortes diarios, reversión de visitas y alertas automáticas.

---

## 🧩 Entidades principales

| Entidad         | Descripción operativa                                |
|-----------------|------------------------------------------------------|
| Ruta            | Plan operativo con color, nombre y gestor asignado   |
| AsignaciónRuta  | Cliente asignado a una ruta con orden de visita      |
| PasoRuta        | Registro de visita, paso cercano u omisión           |
| CorteDiario     | Resumen de actividad diaria por gestor               |
| AlertaEnviada   | Auditoría de omisiones, pasos cercanos y reversiones |

---

## 🔐 Seguridad

Todos los endpoints están protegidos por `JwtAuthGuard` y `RolesGuard`. Se requiere el rol `Gestor` o `Administrador` para registrar, modificar o consultar entidades.

```ts
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Gestor', 'Administrador')
```

---

## 🔗 Endpoints por entidad

### Ruta

- `POST /rutas`
- `GET /rutas/mapa/:id_ruta`

### AsignaciónRuta

- `POST /rutas/asignar`

### PasoRuta

- `POST /rutas/paso`
- `POST /rutas/paso/revertir`

### CorteDiario

- `POST /rutas/corte`
- `POST /rutas/corte/confirmar`

### AlertaEnviada

- (Generadas automáticamente por el sistema)

---

## 🧪 Payloads de ejemplo

```json
// Crear ruta
{
  "color": "#FF9900",
  "nombre": "Ruta Veracruz",
  "registrado_por": 1
}

// Asignar cliente
{
  "id_ruta": 1,
  "id_cliente": 101,
  "orden": 1
}

// Registrar paso
{
  "id_asignacion": 1,
  "id_cliente": 101,
  "paso": true,
  "paso_cercano": false,
  "observaciones": "Cliente visitado",
  "registrado_por": 1
}

// Revertir paso
{
  "id_paso": 1,
  "motivo": "Error de registro",
  "usuario": 1
}

// Generar corte
{
  "id_gestor": 1
}

// Confirmar corte
{
  "id_gestor": 1
}
```

---

## 🧩 Flujo operativo recomendado

1. Registrar ruta
2. Asignar clientes a la ruta
3. Registrar pasos durante la jornada
4. Generar corte diario al finalizar
5. Confirmar corte si no hay omisiones
6. Revertir pasos si hubo errores
7. Consultar vista geográfica para auditoría

---

## 🧱 Recomendaciones institucionales

- Validar cada operación con datos simulados antes de marcar como completa
- Mantener trazabilidad por usuario, fecha y entidad
- Generar alertas automáticas ante omisiones o pasos cercanos
- Documentar cada reversión con motivo y responsable
- Usar vistas SQL para visualización geográfica y auditoría
- Evitar `update` en cortes confirmados o pasos revertidos
- Preparar migraciones para despliegue en producción

---
