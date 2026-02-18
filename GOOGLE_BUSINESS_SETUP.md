# Google Business Profile Integration Setup Guide

Esta guía te ayudará a configurar la integración de Google Business Profile API para sincronizar automáticamente tus reseñas de clientes en la página web.

## 📋 Requisitos Previos

- Una cuenta de **Google Business Profile** (Google My Business)
- Una cuenta de **Google Cloud** con acceso a Google Cloud Console
- Acceso a **Google My Business API**
- Permisos de administrador en tu negocio de Google

## 🚀 Paso 1: Crear un Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Haz clic en el proyecto dropdown en la parte superior
3. Haz clic en **Nuevo Proyecto**
4. Ingresa un nombre: "Home Services Reviews"
5. Haz clic en **Crear**

## 🔐 Paso 2: Habilitar Google My Business API

1. En la barra de búsqueda, busca "Google My Business API"
2. Haz clic en el resultado
3. Haz clic en **Habilitar**
4. Espera a que se complete la habilitación

## 🔑 Paso 3: Crear Credenciales de Servicio

1. Ve a **Credenciales** en el menú izquierdo
2. Haz clic en **Crear Credenciales** → **Cuenta de Servicio**
3. Ingresa los detalles:
   - **Nombre de la cuenta de servicio**: "home-services-reviews"
   - **ID de la cuenta de servicio**: Se genera automáticamente
4. Haz clic en **Crear y Continuar**
5. En "Otorgar acceso a esta cuenta de servicio", haz clic en **Continuar**
6. Haz clic en **Hecho**

## 📝 Paso 4: Generar Clave de Acceso

1. Ve a **Credenciales** nuevamente
2. En la sección "Cuentas de Servicio", haz clic en la cuenta que creaste
3. Ve a la pestaña **Claves**
4. Haz clic en **Agregar Clave** → **Crear Nueva Clave**
5. Selecciona **JSON**
6. Haz clic en **Crear**
7. Se descargará un archivo JSON - **guárdalo en un lugar seguro**

## 🔗 Paso 5: Obtener tu Location Name

1. Ve a [Google My Business](https://www.google.com/business/)
2. Selecciona tu negocio
3. En la URL, verás algo como: `https://business.google.com/locations/123456789`
4. El número es tu **Location ID**
5. Tu **Location Name** será: `accounts/YOUR_ACCOUNT_ID/locations/YOUR_LOCATION_ID`

Para obtener tu Account ID:
1. Ve a Google Cloud Console
2. En **Credenciales**, haz clic en tu cuenta de servicio
3. Copia el **ID único** de la cuenta

## 📱 Paso 6: Generar Access Token

Hay dos formas de obtener el access token:

### Opción A: Usar Google OAuth 2.0

1. Ve a [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. En la configuración (engranaje), habilita "Use your own OAuth credentials"
3. Ingresa tu Client ID y Client Secret del proyecto
4. En el lado izquierdo, busca "Google My Business API"
5. Selecciona los scopes necesarios
6. Haz clic en "Authorize APIs"
7. Completa el flujo de consentimiento
8. Haz clic en "Exchange authorization code for tokens"
9. Copia el **access_token**

### Opción B: Usar Service Account (Recomendado)

1. Usa el archivo JSON descargado anteriormente
2. Implementa JWT para generar un access token
3. Consulta la [documentación de Google](https://developers.google.com/identity/protocols/oauth2/service-account)

## 🔗 Paso 7: Configurar en Home Services Florida

1. Accede al panel de administración: `/admin`
2. Navega a **Google Business Settings**
3. Haz clic en **Configure Google Business**
4. Pega tu **Access Token** en el campo
5. Ingresa tu **Location Name** (accounts/XXX/locations/YYY)
6. Haz clic en **Save Configuration**
7. El sistema validará automáticamente tus credenciales

## 🔄 Paso 8: Sincronizar Reseñas

Una vez configurado:

1. En **Google Business Settings**, haz clic en **Sync Reviews Now**
2. El sistema descargará automáticamente tus últimas reseñas
3. Las reseñas aparecerán en la sección **Testimonials** de tu página

## ⏰ Sincronización Automática

Las reseñas se sincronizan automáticamente cada vez que:

- Visitas la página de inicio (si no se han sincronizado recientemente)
- Haces clic en **Sync Reviews Now** en el panel admin
- Se ejecuta un trabajo programado (si está configurado)

## 📊 Información Sincronizada

Para cada reseña de Google, se sincroniza:

- **Calificación**: 1-5 estrellas
- **Comentario**: Texto de la reseña
- **Autor**: Nombre del cliente
- **Foto del Autor**: Avatar del cliente
- **Respuesta del Negocio**: Si respondiste a la reseña
- **Fecha**: Cuándo se publicó la reseña

## 🔒 Seguridad

- Tu **Access Token** se almacena de forma segura en la base de datos
- Solo los administradores pueden ver y modificar la configuración
- Los tokens se utilizan solo para leer reseñas públicas
- No se almacenan datos personales innecesarios

## 🐛 Solución de Problemas

### "Invalid Access Token"

- Verifica que el token sea válido y no haya expirado
- Regenera el token si es necesario
- Asegúrate de que los scopes incluyan acceso a Google My Business API

### "Could not retrieve account information"

- Verifica que tu Location Name sea correcto
- Asegúrate de que tu cuenta de servicio tenga permisos en Google My Business
- Intenta regenerar el token

### No se sincronizan las reseñas

- Verifica que tu negocio tenga reseñas públicas en Google
- Comprueba que el token tenga permisos para leer reseñas
- Haz clic en **Sync Reviews Now** para sincronizar manualmente
- Revisa los logs en `.manus-logs/` para más detalles

### Las reseñas no se muestran en la página

- Verifica que se hayan sincronizado correctamente
- Comprueba que la sección de testimonios esté habilitada
- Asegúrate de que tu conexión a Internet sea estable

## 🎯 Próximos Pasos

Una vez configurado Google Business:

1. Personaliza los colores y estilos de la sección de testimonios en `client/src/components/GoogleReviewsSection.tsx`
2. Agrega más campos de sincronización si es necesario
3. Configura sincronización automática programada (opcional)
4. Prueba la sección de testimonios en dispositivos móviles y de escritorio

## 📞 Soporte

Si encuentras problemas:

1. Revisa esta guía nuevamente
2. Consulta la [documentación de Google My Business API](https://developers.google.com/my-business/content/overview)
3. Verifica los logs en `.manus-logs/`
4. Contacta a soporte de Manus en https://help.manus.im

---

**Última actualización:** Febrero 2026
