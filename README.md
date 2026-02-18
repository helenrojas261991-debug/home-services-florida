# Home Services Florida - Professional Website

Una página web profesional para servicios de mantenimiento en Florida, con panel de administración, integración de Google Business Profile e Instagram, y soporte bilingüe (inglés/español).

## 🚀 Características

- **Página de inicio profesional** con hero section, servicios, testimonios y galería de Instagram
- **Sistema bilingüe completo** (inglés/español) con selector de idioma
- **Panel de administración** para gestionar contenido y multimedia
- **Integración con Google Business Profile** para mostrar reseñas de clientes
- **Feed de Instagram** integrado que muestra publicaciones automáticamente
- **Formulario de contacto** con almacenamiento de mensajes
- **Autenticación segura** con Manus OAuth
- **Base de datos MySQL** para almacenar contenido y configuraciones
- **API tRPC** para comunicación cliente-servidor
- **Diseño responsive** optimizado para móvil y escritorio

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v22.13.0 o superior)
- **pnpm** (v10.4.1 o superior)
- **Git**
- **WebStorm** (o cualquier editor de código compatible con TypeScript/React)

## 🔧 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/home-services-florida.git
cd home-services-florida
```

### 2. Instalar Dependencias

```bash
pnpm install
```

### 3. Configurar Variables de Entorno

El proyecto utiliza variables de entorno automáticamente inyectadas por Manus. Asegúrate de que las siguientes variables estén disponibles:

```env
# Base de datos
DATABASE_URL=mysql://usuario:contraseña@host:puerto/base_datos

# Autenticación OAuth
VITE_APP_ID=tu_app_id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://login.manus.im
JWT_SECRET=tu_jwt_secret

# APIs de Manus
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=tu_api_key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=tu_frontend_api_key

# Información del propietario
OWNER_OPEN_ID=tu_open_id
OWNER_NAME=Tu Nombre
```

### 4. Ejecutar Migraciones de Base de Datos

```bash
pnpm db:push
```

Este comando generará y aplicará las migraciones de la base de datos.

### 5. Iniciar el Servidor de Desarrollo

```bash
pnpm dev
```

El servidor estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
home-services-florida/
├── client/                 # Frontend React
│   ├── public/            # Archivos estáticos
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── contexts/      # Contextos React (Language, Theme)
│   │   ├── pages/         # Páginas principales
│   │   ├── lib/           # Utilidades y configuración tRPC
│   │   ├── App.tsx        # Componente raíz
│   │   ├── main.tsx       # Punto de entrada
│   │   └── index.css      # Estilos globales
│   └── index.html         # HTML principal
├── server/                # Backend Express
│   ├── db.ts             # Helpers de base de datos
│   ├── routers.ts        # Procedimientos tRPC
│   ├── routers.test.ts   # Pruebas de procedimientos
│   └── _core/            # Configuración interna
├── drizzle/              # Migraciones de base de datos
│   ├── schema.ts         # Definición de tablas
│   └── migrations/       # Archivos de migración
├── shared/               # Código compartido
│   ├── i18n.ts          # Traducciones (EN/ES)
│   └── const.ts         # Constantes
├── storage/              # Helpers de almacenamiento S3
├── package.json          # Dependencias del proyecto
├── tsconfig.json         # Configuración de TypeScript
├── vite.config.ts        # Configuración de Vite
├── drizzle.config.ts     # Configuración de Drizzle ORM
└── vitest.config.ts      # Configuración de pruebas
```

## 🌐 Idiomas Soportados

El proyecto incluye soporte completo para:

- **Inglés (EN)** - Idioma predeterminado
- **Español (ES)** - Traducción completa

Las traducciones se encuentran en `shared/i18n.ts` y se pueden extender fácilmente.

## 🔐 Autenticación

El panel de administración está protegido por autenticación OAuth de Manus. Solo los usuarios con rol `admin` pueden acceder a:

- `/admin` - Panel de administración

Para promover un usuario a administrador, actualiza el campo `role` en la tabla `users` de la base de datos.

## 📊 Base de Datos

El proyecto utiliza MySQL con Drizzle ORM. Las tablas principales son:

- **users** - Usuarios del sistema
- **content** - Contenido editable (hero, servicios, etc.)
- **googleReviews** - Reseñas de Google Business Profile
- **instagramPosts** - Posts de Instagram
- **integrationSettings** - Configuración de integraciones
- **contactSubmissions** - Mensajes de formulario de contacto

## 🧪 Pruebas

Ejecutar todas las pruebas:

```bash
pnpm test
```

Ejecutar pruebas en modo watch:

```bash
pnpm test -- --watch
```

## 🏗️ Construcción para Producción

```bash
pnpm build
```

Iniciar servidor de producción:

```bash
pnpm start
```

## 📝 Procedimientos tRPC Disponibles

### Públicos (sin autenticación)

- `public.getGoogleReviews(limit?)` - Obtener reseñas de Google
- `public.getInstagramPosts(limit?)` - Obtener posts de Instagram
- `public.getContent(key)` - Obtener contenido por clave
- `public.submitContact(data)` - Enviar formulario de contacto

### Admin (requiere rol admin)

- `admin.getAllContent()` - Obtener todo el contenido
- `admin.updateContent(data)` - Actualizar contenido
- `admin.getIntegrationSettings(service)` - Obtener configuración de integración
- `admin.updateIntegrationSettings(data)` - Actualizar configuración
- `admin.getContactSubmissions(limit?)` - Obtener mensajes de contacto

## 🔗 Integración con Google Business Profile

Para integrar Google Business Profile:

1. Obtén las credenciales de Google Business API
2. Accede al panel de administración (`/admin`)
3. Configura los tokens de acceso en la sección de configuración
4. Las reseñas se sincronizarán automáticamente

## 📸 Integración con Instagram

Para integrar Instagram:

1. Crea una aplicación de Instagram Graph API en Facebook Developer Console
2. Obtén el token de acceso de tu cuenta de negocio de Instagram
3. Accede al panel de administración (`/admin`)
4. Ve a **Instagram Settings** y configura tu token
5. Los posts se sincronizarán automáticamente en la galería

**Para instrucciones detalladas**, consulta [INSTAGRAM_SETUP.md](./INSTAGRAM_SETUP.md)

## 🎨 Personalización

### Cambiar Colores

Los colores se definen en `client/src/index.css` usando variables CSS. Edita los valores de color en la sección `:root` o `.dark`.

### Agregar Nuevas Traducciones

Edita `shared/i18n.ts` y agrega tus traducciones en los objetos `en` y `es`.

### Agregar Nuevas Páginas

1. Crea un nuevo archivo en `client/src/pages/NombrePagina.tsx`
2. Agrega la ruta en `client/src/App.tsx`
3. Actualiza la navegación en el header

## 📱 Desarrollo en WebStorm

### Configuración Recomendada

1. **Abrir el proyecto:**
   - File → Open → Selecciona la carpeta del proyecto

2. **Configurar Node.js:**
   - WebStorm → Settings → Languages & Frameworks → Node.js and npm
   - Selecciona la versión de Node.js instalada

3. **Configurar pnpm:**
   - WebStorm → Settings → Languages & Frameworks → Node.js and npm
   - Selecciona pnpm como package manager

4. **Ejecutar servidor de desarrollo:**
   - Terminal → New Terminal
   - Ejecuta: `pnpm dev`

5. **Ejecutar pruebas:**
   - Terminal → New Terminal
   - Ejecuta: `pnpm test`

6. **Debugging:**
   - Usa los breakpoints en WebStorm
   - El servidor se reiniciará automáticamente con cambios

### Extensiones Recomendadas

- **TypeScript** (incluida)
- **React** (incluida)
- **Tailwind CSS** (incluida)
- **ESLint** (opcional)
- **Prettier** (opcional)

## 🚀 Despliegue

El proyecto está configurado para desplegarse en Manus. Para publicar:

1. Crea un checkpoint en el panel de administración
2. Haz clic en el botón "Publish"
3. El sitio estará disponible en tu dominio de Manus

## 📞 Soporte

Para obtener ayuda:

1. Revisa la documentación de Manus: https://manus.im/docs
2. Consulta el archivo `todo.md` para ver tareas pendientes
3. Revisa los logs en `.manus-logs/`

## 📄 Licencia

Este proyecto está bajo licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Crea una rama para tu feature
2. Realiza tus cambios
3. Escribe pruebas
4. Envía un pull request

## 📚 Recursos Adicionales

- [Documentación de React](https://react.dev)
- [Documentación de Tailwind CSS](https://tailwindcss.com)
- [Documentación de tRPC](https://trpc.io)
- [Documentación de Drizzle ORM](https://orm.drizzle.team)
- [Documentación de Manus](https://manus.im)

---

**Última actualización:** Febrero 2026
