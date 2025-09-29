# ACP Cobranza

Sistema modular para cobranza, nómina, control operativo y simulación financiera, diseñado para CENEC. Este repositorio contiene la arquitectura completa del sistema, incluyendo backend, frontend web, aplicación móvil y documentación técnica.

---

## 🧭 Visión del sistema

ACP Cobranza busca empoderar a cada rol operativo con herramientas digitales que reflejen la realidad del negocio. El sistema es:

- **Modular**: cada componente puede evolucionar de forma independiente
- **Auditable**: trazabilidad completa de operaciones y datos
- **Reversible**: permite deshacer acciones sin pérdida de integridad
- **Offline/Online**: funcionalidad sin conexión y sincronización posterior
- **Libre de dependencias externas**: sin vendor lock-in

---

## 🧩 Estructura del repositorio

acp-cobranza/
├── backend/ # API NestJS con Prisma y PostgreSQL
│ ├── src/ # Código fuente (controladores, servicios, módulos)
│ ├── prisma/ # Esquemas, migraciones y cliente Prisma
│ ├── .env # Variables de entorno (no se sube a GitHub)
│ ├── package.json # Scripts y dependencias
│ └── README.md # Documentación técnica del backend
├── frontend-web/ # Dashboard web para roles administrativos
│ └── .gitignore # Exclusiones específicas del frontend
├── app-movil/ # Aplicación móvil para cobradores y socios
│ └── backend/ # API local para sincronización offline
├── docs/ # Documentación técnica y funcional
│ └── .gitignore # Exclusiones de archivos temporales
└── README.md # Documentación general del sistema

---

## ⚙️ Tecnologías principales

- NestJS + TypeScript
- Prisma ORM + PostgreSQL
- React / Expo (en desarrollo)
- JWT + control de roles
- Simulación financiera y punto de equilibrio

---

## 🚀 Instalación rápida

```bash
cd backend
npm install

Configura tu archivo .env con la URL de tu base de datos PostgreSQL:
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/ACP-Cobranza"

Luego ejecuta:
npx prisma db pull       # Introspectar base existente
npx prisma generate      # Generar cliente Prisma
npm run start:dev        # Ejecutar servidor en modo desarrollo
```

---

## 📚 Módulos planeados

Cada módulo será validado con datos reales y simulados antes de marcarse como completo:

- auth – Login, JWT, control de roles
- usuarios – Registro de empleados, cálculo de sueldos
- clientes – Alta, edición, historial y seguimiento
- cobros – Registro, reversibilidad, sincronización
- ventas – Productos, precios, descuentos, historial
- rutas – Asignación, seguimiento, validación
- socios – Capital, aportaciones, beneficios
- inventario – Control físico, virtual, y auditoría
- rrhh – Nómina, ausencias, compensaciones
- punto_equilibrio – Simulación financiera y proyección

## 🧠 Filosofía de desarrollo

- Validación operativa antes de despliegue
- Documentación profesional con estilo Word (Calibri/Arial, justificado)
- Control de versiones con Git y GitHub
- Iteración continua con foco en mantenibilidad y autonomía
- Empatía con los roles reales del negocio

## 🤝 Contribuir

Este proyecto está en evolución constante. Si deseas colaborar:

- Clona el repositorio
- Crea una rama (dev, docs, test, etc.)
- Realiza tus cambios y abre un Pull Request
  Se espera documentación clara, pruebas funcionales, y respeto por la arquitectura modular.

## 📄 Licencia

Este proyecto está bajo una licencia libre para uso interno y educativo. Para usos comerciales o implementación externa, contactar directamente con la autora.
