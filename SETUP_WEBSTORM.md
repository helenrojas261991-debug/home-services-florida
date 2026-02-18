# Guía de Configuración en WebStorm

Esta guía te ayudará a configurar el proyecto "Home Services Florida" en WebStorm para desarrollo local.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

1. **WebStorm** (versión 2024.1 o superior)
2. **Node.js** (v22.13.0 o superior)
3. **pnpm** (v10.4.1 o superior)
4. **Git**

## 🚀 Pasos de Configuración

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/home-services-florida.git
cd home-services-florida
```

O si ya tienes el repositorio:

```bash
cd home-services-florida
```

### Paso 2: Abrir el Proyecto en WebStorm

1. Abre WebStorm
2. Selecciona **File → Open**
3. Navega a la carpeta `home-services-florida`
4. Haz clic en **Open**

WebStorm detectará automáticamente que es un proyecto Node.js/React.

### Paso 3: Configurar Node.js y pnpm

1. Ve a **WebStorm → Settings** (o **WebStorm → Preferences** en macOS)
2. Navega a **Languages & Frameworks → Node.js and npm**
3. En la sección **Node interpreter**, selecciona tu versión de Node.js (v22.13.0)
4. En la sección **Package manager**, selecciona **pnpm**
5. Haz clic en **Apply** y luego **OK**

### Paso 4: Instalar Dependencias

1. Abre la Terminal integrada en WebStorm: **View → Tool Windows → Terminal**
2. Ejecuta el siguiente comando:

```bash
pnpm install
```

WebStorm también puede detectar automáticamente que necesitas instalar dependencias y ofrecerte instalarlas.

### Paso 5: Configurar Variables de Entorno

El proyecto utiliza variables de entorno automáticamente inyectadas por Manus. Si necesitas configurarlas localmente:

1. Crea un archivo `.env.local` en la raíz del proyecto
2. Agrega las variables necesarias (ver `README.md` para la lista completa)

### Paso 6: Ejecutar Migraciones de Base de Datos

1. En la Terminal integrada, ejecuta:

```bash
pnpm db:push
```

Esto creará las tablas necesarias en la base de datos.

### Paso 7: Iniciar el Servidor de Desarrollo

1. En la Terminal integrada, ejecuta:

```bash
pnpm dev
```

Deberías ver algo como:

```
Server running on http://localhost:3000/
```

2. Abre tu navegador y ve a `http://localhost:3000`

## 🔧 Configuración Avanzada de WebStorm

### Configurar Debugging

1. Ve a **Run → Edit Configurations**
2. Haz clic en **+** para agregar una nueva configuración
3. Selecciona **Node.js**
4. Configura:
   - **Name**: "Dev Server"
   - **JavaScript file**: `server/_core/index.ts`
   - **Node parameters**: `--loader tsx`
5. Haz clic en **OK**

Ahora puedes usar **Run → Debug 'Dev Server'** para ejecutar con debugging.

### Configurar Pruebas

1. Ve a **Run → Edit Configurations**
2. Haz clic en **+** para agregar una nueva configuración
3. Selecciona **Vitest**
4. Configura:
   - **Name**: "Tests"
   - **Test file pattern**: `**/*.test.ts`
5. Haz clic en **OK**

Ahora puedes usar **Run → Run 'Tests'** para ejecutar las pruebas.

### Configurar Linting y Formatting

1. Ve a **WebStorm → Settings → Languages & Frameworks → TypeScript → Prettier**
2. Selecciona **Prettier** como formateador
3. Haz clic en **Apply** y **OK**

Ahora puedes usar **Code → Reformat Code** para formatear automáticamente.

## 📁 Estructura de Carpetas en WebStorm

En el panel de proyecto (izquierda), verás:

```
home-services-florida/
├── client/              # Frontend React
├── server/              # Backend Express
├── drizzle/             # Migraciones de BD
├── shared/              # Código compartido
├── storage/             # Helpers de almacenamiento
├── package.json         # Dependencias
├── tsconfig.json        # Config TypeScript
├── vite.config.ts       # Config Vite
└── README.md            # Documentación
```

## 🎯 Flujo de Trabajo Típico

### 1. Crear una Nueva Página

1. Crea un nuevo archivo en `client/src/pages/NombrePagina.tsx`
2. WebStorm te ofrecerá crear un componente React automáticamente
3. Agrega la ruta en `client/src/App.tsx`

### 2. Agregar una Nueva Función de Base de Datos

1. Edita `drizzle/schema.ts` para agregar una nueva tabla
2. En la Terminal, ejecuta `pnpm db:push`
3. Agrega helpers en `server/db.ts`
4. Crea procedimientos tRPC en `server/routers.ts`

### 3. Escribir Pruebas

1. Crea un archivo `*.test.ts` junto a tu código
2. WebStorm reconocerá automáticamente que es una prueba
3. Haz clic en el ícono de "play" verde para ejecutar la prueba

### 4. Hacer Commit de Cambios

1. Ve a **Git → Commit** (o presiona Ctrl+K / Cmd+K)
2. Selecciona los archivos que deseas hacer commit
3. Escribe un mensaje descriptivo
4. Haz clic en **Commit**

## 🐛 Debugging

### Usar Breakpoints

1. Haz clic en el margen izquierdo de una línea para agregar un breakpoint
2. Ejecuta el servidor con debugging: **Run → Debug 'Dev Server'**
3. Cuando se alcance el breakpoint, el servidor se pausará
4. Usa el panel de debugging para inspeccionar variables

### Ver Logs

1. Ve a **View → Tool Windows → Run** para ver los logs del servidor
2. Ve a **View → Tool Windows → Debug Console** para ver los logs de debugging

## 📝 Atajos Útiles

| Atajo | Acción |
|-------|--------|
| Ctrl+K / Cmd+K | Abrir Git Commit |
| Ctrl+Shift+A / Cmd+Shift+A | Buscar acción |
| Ctrl+P / Cmd+P | Buscar archivo |
| Ctrl+Shift+F / Cmd+Shift+F | Buscar en proyecto |
| Ctrl+Alt+L / Cmd+Alt+L | Formatear código |
| Ctrl+/ / Cmd+/ | Comentar/descomenter línea |
| F12 | Ir a definición |
| Shift+F6 | Renombrar variable |

## 🔗 Recursos

- [Documentación de WebStorm](https://www.jetbrains.com/help/webstorm/)
- [Documentación de React](https://react.dev)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs/)
- [Documentación de tRPC](https://trpc.io/docs)

## ❓ Solución de Problemas

### El servidor no inicia

1. Asegúrate de que el puerto 3000 está disponible
2. Verifica que todas las dependencias estén instaladas: `pnpm install`
3. Revisa los logs en la Terminal integrada

### Los cambios no se reflejan

1. WebStorm debería recargar automáticamente (HMR)
2. Si no, presiona F5 en el navegador
3. Si aún no funciona, detén el servidor (Ctrl+C) y reinicia con `pnpm dev`

### Errores de TypeScript

1. Ve a **View → Tool Windows → Problems**
2. Revisa los errores listados
3. Haz clic en un error para ir a la línea problemática

### Base de datos no conecta

1. Verifica que `DATABASE_URL` está configurado correctamente
2. Asegúrate de que el servidor MySQL está corriendo
3. Ejecuta `pnpm db:push` nuevamente

## 💡 Consejos

1. **Usa la búsqueda rápida**: Presiona Ctrl+Shift+F para buscar en todo el proyecto
2. **Refactoriza con confianza**: WebStorm puede renombrar variables en todo el proyecto
3. **Usa el inspector**: Presiona F12 en el navegador para inspeccionar elementos
4. **Lee los logs**: Los logs en la Terminal integrada son muy útiles para debugging
5. **Escribe pruebas**: Las pruebas te ayudarán a evitar errores

## 🚀 Próximos Pasos

Una vez configurado, puedes:

1. Explorar la estructura del proyecto
2. Leer el `README.md` para entender las características
3. Revisar el `todo.md` para ver tareas pendientes
4. Comenzar a hacer cambios y ver cómo se reflejan en tiempo real

¡Feliz codificación! 🎉
