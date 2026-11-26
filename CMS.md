# Ayekantún CMS

## Stack y estructura

- Sitio público: HTML, CSS y JavaScript existentes.
- Servidor: Node.js 22+, Express y SQLite (`better-sqlite3`).
- Contraseñas: bcrypt; sesiones firmadas y persistidas en SQLite.
- Archivos: almacenamiento local en `uploads/`, con límite de 10 MB por archivo.

Archivos añadidos:

```text
admin.html / admin.css / admin.js   Panel responsivo y sus interacciones
cms-client.js                      Lee y aplica el contenido público
server.js                          API, sesiones, validaciones y sitio estático
scripts/create-admin.js            Alta o cambio seguro de la contraseña admin
data/site.db                       Base de datos creada automáticamente
uploads/                           Archivos subidos desde el panel
.env                               Secretos y configuración local (no se versiona)
```

## Puesta en marcha

1. Instala Node.js 22 o posterior.
2. Desde la carpeta del proyecto, ejecuta `npm install`.
3. Copia `.env.example` como `.env`; cambia `SESSION_SECRET` por una cadena aleatoria de al menos 32 caracteres. Puedes generarla con `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`.
4. Crea la cuenta de administración: `npm run create-admin -- nombre-de-usuario`. El comando pide la contraseña sin mostrarla y requiere al menos 12 caracteres. Ejecutarlo de nuevo con el mismo usuario cambia la contraseña.
5. Inicia el sitio con `npm start` y abre `http://localhost:3000/admin`.

No existe una cuenta o contraseña inicial predeterminada. El panel usa una cookie `HttpOnly`, `SameSite=Strict`, sesiones con vencimiento, verificación CSRF, limitación de intentos de inicio de sesión y cabeceras de seguridad. En producción, configura `NODE_ENV=production` y publica detrás de HTTPS. Si el proxy termina TLS, configura también `TRUST_PROXY=1`.

## Datos y persistencia

| Tabla | Propósito |
|---|---|
| `admin_users` | Usuario administrativo y hash bcrypt de contraseña |
| `content` | Valores editables como pares `key` / `value` |
| `media` | Nombre seguro, tipo y fecha de cada archivo cargado |
| `sessions` | Sesiones con vencimiento, mantenidas por el almacén SQLite |

Esquema principal:

```sql
admin_users(id INTEGER PRIMARY KEY, username TEXT UNIQUE, password_hash TEXT, created_at TEXT)
content(key TEXT PRIMARY KEY, value TEXT, updated_at TEXT)
media(id TEXT PRIMARY KEY, filename TEXT UNIQUE, original_name TEXT, mime_type TEXT, created_at TEXT)
sessions(sid TEXT PRIMARY KEY, sess TEXT, expired INTEGER)
```

El servidor crea `data/site.db`, las tablas y los valores iniciales al arrancar. La API pública `GET /api/site` entrega únicamente el contenido público; la administración requiere sesión autenticada. El guardado de textos se realiza en una transacción. Las cargas permitidas son JPG, PNG, WEBP, GIF, MP3 y OGG; no se permiten SVG ni archivos ejecutables. Al borrar un archivo asignado, también se vacían sus referencias publicadas.

El panel tiene accesos directos a Inicio, La Escuelita, Inscripciones, Deportistas, Entrenadora, Galería, Videos y transmisiones, Horarios, Contacto y Fotos. Se pueden agregar fotos a Inicio y a la Galería, actividades de La Escuelita, deportistas y sus canciones de coreografía, secciones de la entrenadora, horarios adicionales, próximos eventos, repeticiones de transmisiones y direcciones de contacto. Cada elemento se edita en su sección y las fotos o pistas asociadas se administran también desde Fotos o desde la ficha correspondiente. Se admiten hasta 100 elementos por lista; los cambios se publican al guardar. Los textos editables incluyen además los encabezados, perfiles, video destacado, información de contacto, pie de página y página de agradecimiento.

Los valores se guardan en `content`. Los elementos con `data-cms` y `data-cms-image` se actualizan desde esos valores; `cms-client.js` también sincroniza los enlaces de correo, WhatsApp, Instagram y YouTube existentes y el correo de los formularios FormSubmit. El reproductor de música se muestra cuando se activa y tiene controles; los navegadores pueden requerir que cada visitante inicie manualmente la reproducción.

## Publicación

GitHub Pages solo sirve archivos estáticos y no puede ejecutar Express ni guardar cambios en SQLite. Este proyecto incluye `render.yaml` para desplegar el sitio y el CMS como un servicio Node.js en Render, con un disco persistente de 1 GB montado en `/var/data`. El disco guarda `site.db` y los archivos subidos; el servidor y el disco se facturan mensualmente. Según los precios consultados al preparar esta configuración, el servicio de 0.5 CPU/512 MB cuesta aproximadamente US$7/mes y el disco US$0.25/mes por GB; confirma el total vigente en Render antes de desplegar.

Para desplegar:

1. Confirma que los cambios que quieres publicar estén en GitHub. No subas `.env`, `data/site.db` ni archivos privados.
2. En Render, crea un **Blueprint** y conecta el repositorio. Render detectará `render.yaml`; revisa el plan y el costo antes de aplicar.
3. Después del primer despliegue, abre el **Shell** del servicio y crea la cuenta administrativa con `npm run create-admin -- tu-usuario`. Usa una contraseña nueva de al menos 12 caracteres.
4. Entra a `https://<nombre-del-servicio>.onrender.com/admin`.

El disco remoto comienza vacío: el servidor carga los textos e imágenes de ejemplo incluidos en el proyecto, pero no copia automáticamente la base de datos, la cuenta ni los archivos subidos de esta computadora. Vuelve a crear la cuenta y replica en el panel los cambios locales que quieras publicar. No reutilices la contraseña local ni la incluyas en GitHub.

Render entrega una URL nueva `onrender.com` y sirve allí tanto el sitio público como el panel para que compartan la misma API. El sitio que ya está publicado en GitHub Pages no se actualiza con estos cambios; para usar el dominio actual con el CMS habrá que apuntarlo a Render después de verificar el despliegue.
