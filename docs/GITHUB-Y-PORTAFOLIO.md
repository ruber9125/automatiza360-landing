# GitHub y portafolio

Qué se publica, qué no debe publicarse nunca, y cómo presentar tu trabajo para que otro desarrollador pueda evaluarlo.

---

## 1. Qué archivos son públicos

En un repositorio público, **todo lo que subes es visible para cualquiera**. No solo los archivos actuales: también **todo el historial**. Si subiste una contraseña y la borraste en el commit siguiente, sigue estando ahí para quien mire el historial.

En este proyecto se publica:

| Se sube | Por qué |
|---|---|
| `src/`, `public/`, `index.html` | Es el proyecto. |
| `package.json` | Declara dependencias y comandos. |
| `package-lock.json` | Fija las versiones exactas: garantiza que la instalación de otra persona sea idéntica a la tuya. |
| `vite.config.js` | Configuración de compilación. |
| `.github/workflows/` | El despliegue automático. |
| `scripts/` | Herramientas del proyecto. |
| `docs/`, `README.md` | Documentación. |
| `.gitignore` | Le dice a Git qué ignorar. |

Y se ignora (`.gitignore`):

| No se sube | Por qué |
|---|---|
| `node_modules/` | Cientos de MB regenerables con `npm install`. Subirlo es el error de principiante más visible. |
| `dist/` | Se genera en cada build. Subirlo provoca conflictos constantes. |
| `.env`, `.env.*` | **Claves y secretos.** Ver el apartado siguiente. |
| `*.log`, `.vite`, `.eslintcache` | Ruido local. |
| `.vscode/`, `.idea/` | Configuración de tu editor, no del proyecto. |
| `.DS_Store`, `Thumbs.db` | Basura del sistema operativo. |

---

## 2. Qué no debes subir nunca

### Credenciales y secretos

- Claves de API (OpenAI, Stripe, SendGrid, AWS…)
- Contraseñas y cadenas de conexión a bases de datos
- Tokens de acceso personal de GitHub
- Certificados y claves privadas (`.pem`, `.key`)
- Ficheros `.env` de cualquier tipo

**Los bots rastrean GitHub en busca de claves filtradas y las explotan en minutos, no en días.** Hay casos documentados de facturas de miles de euros por una clave de AWS expuesta durante una tarde.

Si se te escapa una: **rótala inmediatamente** (invalida la vieja y genera una nueva). Borrarla del repositorio no basta, porque ya está en el historial y probablemente en cachés de terceros.

### Datos personales

- Direcciones, teléfonos o emails de clientes reales
- Capturas con datos de personas identificables
- Volcados de base de datos con información real

En esta landing, el número de WhatsApp y el email son datos comerciales pensados para ser públicos. Es distinto de los datos de un cliente.

### Cómo se manejan los secretos correctamente

En un proyecto Vite, las variables de entorno van en `.env` (ignorado) y se documenta un `.env.example` (sí se sube) con las claves vacías:

```bash
# .env.example  ← esto SÍ se sube
VITE_API_URL=
VITE_ANALYTICS_ID=
```

```bash
# .env  ← esto NUNCA se sube
VITE_API_URL=https://api.real.com
VITE_ANALYTICS_ID=G-XXXXXXX
```

⚠️ **Aviso importante sobre Vite:** cualquier variable con prefijo `VITE_` **acaba dentro del JavaScript que se descarga el navegador**. No es un secreto: es texto visible en el código fuente de la web. Solo sirve para valores públicos (un ID de analítica, una URL de API pública). Una clave que deba permanecer secreta necesita un backend; no existe forma de esconderla en una web estática.

En GitHub Actions, los secretos van en **Settings → Secrets and variables → Actions**, y se usan como `${{ secrets.MI_CLAVE }}`. Nunca en texto plano en el YAML.

---

## 3. Cómo escribir un README profesional

El README es lo primero —y a menudo lo único— que lee quien visita tu repositorio. Tienes unos treinta segundos de su atención.

### La estructura que funciona

```markdown
# Nombre del proyecto
Una frase que explique qué es y para quién.

[Demo en vivo] · [Capturas]

## Qué problema resuelve
2-4 frases. Contexto, no características.

## Stack
Las tecnologías, y por qué esas.

## Arranque rápido
git clone / npm install / npm run dev  ← que funcione copiando y pegando

## Estructura
Un árbol de carpetas comentado.

## Decisiones técnicas
Las 3-5 elecciones no obvias, y su porqué.

## Estado y limitaciones
Qué falta, qué es demostración, qué mejorarías.
```

### Los cinco errores que lo hunden

1. **No enlazar la demo.** Si hay una web publicada, el enlace va arriba del todo. Nadie va a clonar tu repo para ver si merece la pena.
2. **Listar tecnologías sin explicar por qué.** "React, Vite, CSS" no dice nada. "CSS plano en vez de Tailwind porque el encargo pedía iterar el diseño después" demuestra criterio.
3. **Instrucciones que no funcionan.** Prueba tus propios pasos en una carpeta limpia. Un `npm install` que falla es una entrevista perdida.
4. **Describir lo que hace cada archivo.** Eso ya se ve en el código. Explica las decisiones, que es lo que no se ve.
5. **Ocultar las limitaciones.** Decir "los testimonios son de demostración" genera más confianza que dejar que lo descubran solos.

### Lo que de verdad diferencia

**Explicar el porqué de tus decisiones.** Un desarrollador junior enseña que sabe usar una herramienta. Uno con criterio enseña que sabe *cuándo* usarla y qué descartó. Esa sección de "decisiones técnicas" vale más que tres proyectos sin ella.

**Ser honesto con lo que falta.** "Sé que esto no tiene tests y añadiría Vitest para la lógica del CTA" demuestra que sabes qué es un proyecto completo. Fingir que está terminado, cuando no lo está, demuestra lo contrario.

**Capturas o GIF.** Un proyecto visual sin imagen en el README obliga a imaginárselo. Añade una captura del hero:

```markdown
![Landing de Automatiza360](docs/captura.png)
```

---

## 4. Cómo estructurar un portafolio

### Pocos proyectos, bien terminados

**Tres proyectos rematados valen más que diez a medias.** Quien te evalúa asume que tu peor repositorio representa tu estándar de calidad. Un perfil con quince repos, doce de ellos tutoriales abandonados, comunica lo contrario de lo que pretende.

Fija los buenos en tu perfil (**Customize your pins**, hasta seis).

### Que cada proyecto demuestre algo distinto

No repitas la misma habilidad. Un portafolio equilibrado enseña variedad:

| Proyecto | Qué demuestra |
|---|---|
| Esta landing | Frontend, diseño, atención al detalle, despliegue |
| Una API (tu `todo-api-fastapi`) | Backend, modelado de datos, endpoints REST |
| Un dashboard de datos (tu proyecto de mortalidad) | Análisis, visualización, Python |

Ya tienes esa variedad: frontend, backend y datos. Eso ya cuenta una historia sobre ti.

### Lo que miran de verdad quienes revisan

En este orden:

1. **¿Hay demo?** Si funciona en vivo, es real.
2. **¿El README explica el porqué?** Filtra a quien copió un tutorial de quien tomó decisiones.
3. **¿Los commits cuentan una historia?** `arreglos`, `cambios2`, `final_final` es una señal de alarma. Mensajes descriptivos indican trabajo ordenado.
4. **¿El código es legible?** Nombres claros, estructura consistente, comentarios donde hacen falta.
5. **¿Está terminado?** Un proyecto pequeño y acabado supera a uno ambicioso abandonado.

### Commits que ayudan

```
✅ Corregir el desbordamiento del hero en pantallas < 380px
✅ Añadir cierre del menú móvil con Escape
❌ cambios
❌ fix
❌ asdasd
```

Formato útil: un verbo en infinitivo, qué y dónde. Si el cambio necesita contexto, añade un cuerpo explicando **por qué**, no qué (el diff ya dice qué).

### Tu perfil de GitHub

- **README de perfil**: crea un repo con tu nombre de usuario (`ruber9125/ruber9125`) y un `README.md`. Se muestra arriba en tu perfil. Quién eres, qué haces, cómo contactarte.
- **Descripción y temas en cada repo**: rellena la descripción y añade topics (`react`, `vite`, `landing-page`). Mejora la búsqueda y demuestra cuidado.
- **Enlace a la web publicada** en el campo *Website* del repositorio.

---

## 5. Flujo de trabajo diario con Git

```bash
git status                        # qué has cambiado
git add -A                        # preparar todo
git commit -m "Mensaje claro"     # confirmar
git push                          # subir (y desplegar, en este repo)
```

Para cambios grandes, trabaja en una rama:

```bash
git checkout -b mejora-formulario
# … trabajas y haces commits …
git push -u origin mejora-formulario
```

Después abre un Pull Request en GitHub. Aunque trabajes solo, tiene valor: deja constancia de por qué se hizo cada cambio, y en un portafolio demuestra que conoces el flujo que se usa en equipo.

### Nota para Windows

Git avisará de `LF will be replaced by CRLF`. Es normal: Windows y Unix marcan el fin de línea distinto. Para normalizarlo, crea un archivo `.gitattributes`:

```
* text=auto eol=lf
```
