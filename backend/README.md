# 🧱 Backend – ACP Cobranza

## 🧭 Propósito

Este backend institucional gestiona todos los procesos operativos, administrativos y de configuración del sistema ACP Cobranza. Está construido en NestJS con TypeScript, y estructurado en módulos independientes que permiten trazabilidad, seguridad, reversibilidad y simulación antes de producción.

Cada módulo está diseñado para ser auditable, escalable y mantenible por equipos técnicos con documentación institucional.

---

## 📂 Estructura del proyecto

```
backend/
├── dist/                      # Archivos compilados
├── node_modules/              # Dependencias instaladas
├── src/                       # Código fuente principal
│   ├── api/                   # Registro de sucursales
│   ├── auditoria/             # Consulta de accesos registrados
│   ├── auth/                  # Autenticación, autorización y trazabilidad
│   ├── configuracion/         # Parámetros, flags, empresa, impresoras
│   ├── rrhh/                  # Usuarios, roles, tareas, accesos
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── database.module.ts
│   ├── database.service.ts
│   ├── gapi.d.ts
│   ├── main.ts
│   └── README.md
├── test/                      # Pruebas unitarias
├── .env                       # Variables de entorno
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── nest-cli.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.build.json
└── README.md
```

---

## 🧩 Módulos incluidos

| Módulo                                        | Descripción operativa                                            |
|-----------------------------------------------|------------------------------------------------------------------|
| [`api`](../api/README.md)                     | Registro de sucursales con trazabilidad por usuario              |
| [`auditoria`](../auditoria/README.md)         | Consulta de accesos registrados por IP, módulo y usuario         |
| [`auth`](../auth/README.md)                   | Login, emisión de JWT, autorización por rol, registro de accesos |
| [`configuracion`](../configuracion/README.md) | Parámetros, flags, empresa, impresoras y asignaciones            |
| [`rrhh`](../rrhh/README.md)                   | Gestión de usuarios, roles, tareas y accesos operativos          |

---

## 🔐 Seguridad institucional

- Autenticación vía JWT con estrategia Passport
- Autorización por rol usando `RolesGuard` y `@Roles()` en cada controlador
- Registro automático de accesos con `AccessLoggerInterceptor`
- Validación de token en todos los endpoints protegidos
- Separación de roles operativos (`Secretaria`, `Supervisor`) y administrativos (`Administrador`)

---

## 🧠 Recomendaciones técnicas

- Simular todos los flujos antes de activarlos en producción
- Versionar parámetros críticos antes de sobrescribir
- Documentar cada módulo en su carpeta `docs/`
- Indexar campos operativos (`fecha`, `usuario`, `modulo`) para rendimiento
- Usar `pgcrypto` para cifrado de contraseñas:
  ```sql
  crypt(contrasenia, gen_salt('bf'))
  ```
- Validar unicidad en claves compuestas (`usuario`, `modulo`, `clave`, etc.)
- Registrar accesos críticos y auditar cambios sensibles

---

## 📌 Estado del backend

✅ Modular y documentado  
🔒 Seguridad activa por token y rol  
📄 Trazabilidad operativa y técnica  
🧱 Listo para producción institucional

---

