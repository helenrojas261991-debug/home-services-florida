# Instagram Integration Setup Guide

Esta guía te ayudará a configurar la integración de Instagram Graph API para sincronizar automáticamente tus posts en la galería de tu página web.

## 📋 Requisitos Previos

- Una cuenta de **Instagram Business** (no personal)
- Una cuenta de **Facebook** vinculada a tu cuenta de Instagram
- Acceso a **Facebook Developer Console**
- Permisos de administrador en tu página de Facebook

## 🚀 Paso 1: Crear una Aplicación en Facebook Developer Console

1. Ve a [Facebook Developer Console](https://developers.facebook.com/)
2. Haz clic en **Mis Apps** → **Crear App**
3. Selecciona **Tipo de App**: Elige **Empresarial**
4. Completa los detalles:
   - **Nombre de la App**: "Home Services Gallery"
   - **Email de contacto**: Tu email
   - **Propósito de la App**: "Sincronizar posts de Instagram"
5. Haz clic en **Crear App**

## 🔐 Paso 2: Configurar Instagram Graph API

1. En tu app, ve a **Productos** → **Agregar Producto**
2. Busca **Instagram Graph API** y haz clic en **Configurar**
3. Ve a **Configuración** → **Básica** y copia tu **ID de App** y **Clave Secreta**

## 👤 Paso 3: Conectar tu Cuenta de Instagram

1. Ve a **Roles** → **Funciones de Administrador**
2. Agrega tu cuenta de Facebook como **Administrador de Apps**
3. Ve a **Configuración** → **Básica** y desplázate hasta **Dominios de App**
4. Agrega tu dominio: `https://tu-dominio.manus.space`

## 🔑 Paso 4: Generar Access Token

### Opción A: Token de Larga Duración (Recomendado)

1. Ve a **Herramientas** → **Explorador de Graph API**
2. En el dropdown, selecciona tu app
3. Cambia el método a **GET**
4. En el campo de consulta, escribe: `me/accounts`
5. Haz clic en **Enviar**
6. Verás tu página de Facebook listada. Copia el `access_token`

### Opción B: Usar Facebook Login

1. Ve a **Productos** → **Facebook Login** → **Configuración**
2. Agrega tu dominio en **URI de redirección válidos**
3. Usa el flujo OAuth para obtener un token

## 📱 Paso 5: Obtener tu ID de Cuenta de Negocio de Instagram

1. Con tu access token, ve a [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Ejecuta esta consulta:
   ```
   GET /me?fields=instagram_business_account
   ```
3. Copia el `instagram_business_account.id` - este es tu Business Account ID

## 🔗 Paso 6: Configurar en Home Services Florida

1. Accede al panel de administración: `/admin`
2. Navega a **Instagram Settings**
3. Haz clic en **Configure Instagram**
4. Pega tu **Access Token** en el campo
5. Haz clic en **Save Configuration**
6. El sistema validará automáticamente tu token y obtendrá tu información de cuenta

## 🔄 Paso 7: Sincronizar Posts

Una vez configurado:

1. En **Instagram Settings**, haz clic en **Sync Posts Now**
2. El sistema descargará automáticamente tus últimos 12 posts
3. Los posts aparecerán en la sección **Gallery** de tu página

## ⏰ Sincronización Automática

Los posts se sincronizan automáticamente cada vez que:

- Visitas la página de inicio
- Haces clic en **Sync Posts Now** en el panel admin
- Se ejecuta un trabajo programado (si está configurado)

## 🔒 Seguridad

- Tu **Access Token** se almacena de forma segura en la base de datos
- Solo los administradores pueden ver y modificar la configuración
- Los tokens se utilizan solo para leer posts públicos
- No se almacenan fotos en el servidor; se enlazan directamente desde Instagram

## 🐛 Solución de Problemas

### "Invalid Access Token"

- Verifica que el token sea válido en [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
- Asegúrate de que tu cuenta de Instagram esté vinculada a tu página de Facebook
- Regenera el token si es necesario

### "Could not retrieve Instagram business account ID"

- Verifica que tu cuenta de Instagram sea una **Cuenta de Negocio**
- Asegúrate de que tu cuenta de Facebook sea administrador de la página vinculada
- Intenta regenerar el token

### No se sincronizan los posts

- Verifica que tu cuenta de Instagram tenga posts públicos
- Comprueba que el token tenga permisos para leer posts
- Haz clic en **Sync Posts Now** para sincronizar manualmente
- Revisa los logs en `.manus-logs/` para más detalles

### Los posts no se muestran en la galería

- Verifica que los posts se hayan sincronizado correctamente
- Comprueba que las URLs de las imágenes sean válidas
- Asegúrate de que tu conexión a Internet sea estable

## 📊 Campos Sincronizados

Para cada post de Instagram, se sincroniza:

- **ID**: Identificador único del post
- **Caption**: Descripción del post
- **Media Type**: IMAGE, VIDEO, o CAROUSEL_ALBUM
- **Media URL**: URL de la imagen o video
- **Permalink**: Enlace al post en Instagram
- **Timestamp**: Fecha y hora de publicación
- **Like Count**: Número de likes
- **Comment Count**: Número de comentarios

## 🔄 Actualizar Configuración

Para cambiar tu token o desconectar Instagram:

1. Ve a **Instagram Settings** en el panel admin
2. Haz clic en **Disconnect**
3. Sigue los pasos anteriores para reconectar con un nuevo token

## 📞 Soporte

Si encuentras problemas:

1. Revisa esta guía nuevamente
2. Consulta la [documentación de Instagram Graph API](https://developers.facebook.com/docs/instagram-api)
3. Verifica los logs en `.manus-logs/`
4. Contacta a soporte de Manus en https://help.manus.im

## 🎯 Próximos Pasos

Una vez configurado Instagram:

1. Personaliza los colores y estilos de la galería en `client/src/pages/Home.tsx`
2. Agrega más campos de sincronización si es necesario
3. Configura sincronización automática programada (opcional)
4. Prueba la galería en dispositivos móviles y de escritorio

---

**Última actualización:** Febrero 2026
