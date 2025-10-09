```md
# 🧑‍💼 Módulo RRHH – ACP Cobranza

## 🧭 Propósito

El módulo `rrhh` gestiona los recursos humanos del sistema ACP Cobranza. Administra usuarios, roles, tareas operativas, asignaciones manuales y accesos institucionales. Está diseñado para ser modular, auditable y trazable, con seguridad por rol y simulación operativa.

---

## 📂 Estructura del módulo

```
src/rrhh/
├── dto/
│   ├── asignacion-manual.dto.ts
│   ├── asignar-rol.dto.ts
│   ├── crear-tarea-temporal.dto.ts
│   ├── create-rol.dto.ts
│   ├── create-usuario.dto.ts
│   ├── rol.dto.ts
│   ├── tarea-secretaria.dto.ts
│   └── usuario.dto.ts
├── accesos.controller.ts
├── roles.controller.ts
├── tareas.controller.ts
├── usuarios.controller.ts
├── rrhh.service.ts
├── rrhh.module.ts
└── README.md
```

---

## 🧩 Submódulos incluidos

| Submódulo         | Descripción operativa                                      |
|-------------------|------------------------------------------------------------|
| `usuarios`        | Registro, autenticación y asignación de roles              |
| `roles`           | Jerarquía institucional y permisos por módulo              |
| `tareas`          | Registro, asignación y evaluación de tareas operativas     |
| `accesos`         | Consulta de accesos registrados por usuario y módulo       |

---

## 📦 DTOs utilizados

| DTO                         | Uso principal                                               |
|----------------------------|-------------------------------------------------------------|
| `CreateUsuarioDto`         | Alta de usuarios institucionales                            |
| `CreateRolDto`             | Registro de roles con nivel jerárquico                      |
| `AsignarRolDto`            | Asignación de rol a usuario                                 |
| `CrearTareaTemporalDto`    | Registro de tareas pendientes por asignar                   |
| `AsignacionManualDto`      | Asignación directa de tareas a secretarias                  |
| `TareaSecretariaDto`       | Consulta y evaluación de tareas asignadas                   |
| `UsuarioDto`               | Consulta de datos operativos de usuario                     |
| `RolDto`                   | Consulta de roles activos                                   |

---

## 🔐 Seguridad

- Todos los controladores usan `JwtAuthGuard` y `RolesGuard`
- Roles permitidos: `Administrador`, `Supervisor`, `Secretaria`
- Campos como `usuario`, `id_usuario`, `id_sucursal` se extraen del token
- Accesos críticos se registran en la tabla `rrhh.accesos`

---

## 🔗 Endpoints activos

### Usuarios

| Método | Ruta                       | Descripción                          |
|--------|----------------------------|--------------------------------------|
| GET    | `/rrhh/usuarios`           | Listar usuarios                      |
| POST   | `/rrhh/usuarios`           | Crear nuevo usuario                  |
| GET    | `/rrhh/usuarios/:id`       | Buscar usuario por ID                |
| PATCH  | `/rrhh/usuarios/:id/rol`   | Asignar rol a usuario                |

### Roles

| Método | Ruta               | Descripción                          |
|--------|--------------------|--------------------------------------|
| GET    | `/rrhh/roles`      | Listar roles activos                 |
| POST   | `/rrhh/roles`      | Crear nuevo rol                      |

### Tareas

| Método | Ruta                                      | Descripción                              |
|--------|-------------------------------------------|------------------------------------------|
| GET    | `/rrhh/tareas`                            | Listar tareas temporales                 |
| POST   | `/rrhh/tareas/temporales`                 | Crear tarea temporal                     |
| POST   | `/rrhh/tareas/asignacion-manual`          | Asignar tarea manualmente                |
| POST   | `/rrhh/tareas/procesar`                   | Consolidar tareas definitivas            |
| GET    | `/rrhh/tareas/secretaria/:id`             | Consultar tareas por secretaria          |
| PATCH  | `/rrhh/tareas/:id/evaluar`                | Evaluar tarea completada                 |
| GET    | `/rrhh/tareas/hoy`                        | Consultar tareas activas del día         |

### Accesos

| Método | Ruta               | Descripción                          |
|--------|--------------------|--------------------------------------|
| GET    | `/auth/accesos`    | Consultar accesos registrados        |

---

## 🧠 Lógica del servicio (`RrhhService`)

| Método                      | Descripción                                                                 |
|----------------------------|------------------------------------------------------------------------------|
| `listarUsuarios()`         | Consulta de usuarios registrados                                            |
| `crearUsuario()`           | Alta de usuario con validación y cifrado                                   |
| `buscarUsuarioPorId()`     | Consulta individual por ID                                                  |
| `listarRoles()`            | Consulta de roles activos                                                   |
| `crearRol()`               | Registro de nuevo rol con nivel y acceso institucional                      |
| `asignarRol()`             | Asignación de rol a usuario                                                 |
| `listarTareas()`           | Consulta de tareas temporales                                               |
| `crearTareaTemporal()`     | Registro de tarea pendiente por asignar                                     |
| `asignarTareaManual()`     | Asignación directa de tarea a secretaria                                    |
| `procesarAsignaciones()`   | Consolidación de tareas definitivas desde asignaciones manuales             |
| `listarTareasSecretaria()` | Consulta de tareas asignadas por secretaria                                 |
| `evaluarTarea()`           | Evaluación y cierre de tarea completada                                     |
| `listarTareasDeHoy()`      | Consulta de tareas activas con fecha límite igual a hoy                     |
| `listarAccesos()`          | Consulta de accesos registrados en la tabla `rrhh.accesos`                  |

---

## 🧠 Recomendaciones institucionales

- Validar unicidad de usuario y correo antes de registrar
- Cifrar contraseñas con `pgcrypto` desde SQL:
  ```sql
  crypt(contrasenia, gen_salt('bf'))
  ```
- Versionar roles si se requiere trazabilidad jerárquica
- Simular tareas antes de consolidarlas en producción
- Registrar accesos críticos con `AccessLoggerInterceptor`
- Documentar cada flujo en su respectivo `README.md`
- Indexar `fecha`, `usuario`, `modulo` en `rrhh.accesos` para rendimiento

---

## 📂 Ubicación del código

- Carpeta principal: `src/rrhh/`
- Documentación: `docs/rrhh/`
- DTOs: `src/rrhh/dto/`
- Servicio: `src/rrhh/rrhh.service.ts`
- Controladores: `usuarios.controller.ts`, `roles.controller.ts`, `tareas.controller.ts`, `accesos.controller.ts`
- Módulo: `src/rrhh/rrhh.module.ts`

---

## 📌 Estado del módulo

✅ Estructura modular y clara  
🔒 Seguridad activa por token y rol  
📄 Documentado y trazable  
🧱 Listo para producción y auditoría
```

