# 📘 Módulo Clientes 

## 🧱 Propósito

El módulo `clientes` permite registrar, consultar y auditar personas físicas o morales que interactúan comercialmente con la institución. Está diseñado para ser territorialmente trazable, reversible y listo para integración con ventas, facturación y seguimiento operativo.

---

## 🧩 Entidad principal

| Campo                 | Tipo       | Descripción operativa         |
|-----------------------|------------|-------------------------------|
| `id_cliente`          | SERIAL     | Identificador único           |
| `nombre_completo`     | TEXT       | Nombre completo del cliente   |
| `calle`               | TEXT       | Calle de residencia           |
| `numero_casa`         | TEXT       | Número exterior/interior      |
| `colonia`             | TEXT       | Colonia o zona                |
| `poblacion`           | TEXT       | Población o localidad         |
| `municipio`           | TEXT       | Municipio                     |
| `estado`              | TEXT       | Estado                        |
| `telefono`            | TEXT       | Número de contacto            |
| `referencia_personal` | TEXT       | Persona conocida o vínculo    |
| `casa_propia`         | BOOLEAN    | TRUE = propia, FALSE = renta  |
| `descripcion_casa`    | TEXT       | Características del domicilio |
| `referencias_cercanas`| TEXT      | Puntos de referencia          |
| `latitud`             | DECIMAL    | Coordenada geográfica         |
| `longitud`            | DECIMAL    | Coordenada geográfica         |
| `fecha_creacion`      | TIMESTAMP  | Registro automático           |
| `fecha_modificacion`  | TIMESTAMP  | Última modificación           |

---

## 🔐 Seguridad

Todos los endpoints están protegidos por `JwtAuthGuard` y `RolesGuard`. Se requiere el rol `Administrador` para registrar, modificar o eliminar clientes.

```ts
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Administrador')
```

---

## 🔗 Endpoints REST

| Método | Ruta             | Descripción               |
|--------|------------------|---------------------------|
| POST   | `/clientes`      | Registrar cliente         |
| GET    | `/clientes`      | Listar todos              |
| GET    | `/clientes/:id`  | Consultar por ID          |
| PATCH  | `/clientes/:id`  | Actualizar datos          |
| DELETE | `/clientes/:id`  | Eliminar cliente          |

---

## 🧪 Payload de ejemplo

```json
{
  "nombre_completo": "María López",
  "calle": "Av. Reforma",
  "numero_casa": "123",
  "colonia": "Centro",
  "poblacion": "Coatepec",
  "municipio": "Xalapa",
  "estado": "Veracruz",
  "telefono": "2281234567",
  "referencia_personal": "Hermana de Juan",
  "casa_propia": true,
  "descripcion_casa": "Casa de dos pisos con portón blanco",
  "referencias_cercanas": "Frente a la panadería La Espiga",
  "latitud": 19.456789,
  "longitud": -96.789012
}
```

---

## 🧩 Flujo operativo recomendado

1. Registrar cliente con datos completos
2. Consultar cliente por ID
3. Actualizar contacto o domicilio
4. Eliminar cliente si es necesario
5. Validar trazabilidad territorial (latitud/longitud)

---

## 🧱 Recomendaciones institucionales

- Validar cada operación con datos simulados antes de marcar como completa
- Mantener trazabilidad por usuario, fecha y ubicación
- Evitar `update` masivo sin control de auditoría
- Documentar cada cambio en código y base de datos
- Preparar migraciones para despliegue en producción

---
