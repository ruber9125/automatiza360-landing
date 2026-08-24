# Despliegue

De `http://localhost:5173` a una web pública.

---

## 1. Qué significa "pasar a producción"

Cuando ejecutas `npm run dev`, ocurre esto:

```
Tu ordenador
  └── Node ejecuta Vite
        └── sirve los archivos en localhost:5173
              └── solo accesible desde tu máquina
```

`localhost` significa literalmente "este ordenador". Nadie más puede entrar: no existe fuera de tu equipo.

Para que exista en internet hacen falta dos cosas:

1. **Compilar** el proyecto a archivos que cualquier navegador entienda.
2. **Alojar** esos archivos en un servidor con una dirección pública.

### El paso 1: compilar

```bash
npm run build
```

Vite coge tu código fuente (JSX, imports, variables CSS) y produce `dist/`:

```
dist/
├── index.html
├── assets/
│   ├── index-CrMH3kYG.js     ← todo el JavaScript, minificado
│   └── index-lqLl8Apq.css    ← todo el CSS, minificado
├── favicon.svg, favicon.ico, icon-*.png
└── site.webmanifest
```

Fíjate en dos detalles:

- **El JSX ha desaparecido.** Los navegadores no entienden JSX; Vite lo ha traducido a JavaScript normal.
- **Los nombres llevan un hash** (`index-CrMH3kYG.js`). Si cambias el código, cambia el hash, y el navegador del visitante se ve obligado a descargar la versión nueva en lugar de servir una cacheada.

Esto es un **sitio estático**: solo HTML, CSS y JS. No necesita Node en el servidor, ni base de datos. Cualquier servidor de archivos vale.

### El paso 2: alojar

Aquí es donde entra GitHub Pages, Vercel o Netlify. Los tres hacen lo mismo en esencia: guardan tu carpeta `dist/` y la sirven bajo un dominio.

---

## 2. Qué plataforma elegir

| | GitHub Pages | Vercel | Netlify |
|---|---|---|---|
| Precio para este proyecto | Gratis | Gratis | Gratis |
| Configuración | Un workflow (ya hecho) | Conectar el repo | Conectar el repo |
| Despliegue automático al hacer push | ✅ | ✅ | ✅ |
| Vista previa de cada Pull Request | ❌ | ✅ | ✅ |
| Dominio propio + HTTPS | ✅ | ✅ | ✅ |
| Necesita cuenta en otro servicio | ❌ | ✅ | ✅ |
| Funciones serverless / formularios | ❌ | ✅ | ✅ |

### Recomendación

**Para este proyecto, tal como está hoy: GitHub Pages.** Ya está configurado y funcionando, es 100 % estático, y no añade otra cuenta ni otro panel que mantener. Para un portafolio tiene además una ventaja concreta: el repositorio y la web viven en el mismo sitio, así que quien mire tu perfil pasa del código a la demo en un clic.

**Cámbiate a Vercel cuando** necesites algo que Pages no puede dar:

- Un **formulario de contacto** que envíe emails (requiere código de servidor).
- **Vistas previas por rama**: cada Pull Request genera su propia URL para revisar cambios antes de fusionar.
- Un **dominio propio con configuración compleja** (redirecciones, cabeceras personalizadas).

Netlify es prácticamente equivalente a Vercel; su ventaja diferencial son los formularios sin escribir backend (`netlify forms`). Si acabas necesitando el formulario de contacto de la Opción B, Netlify es el camino más corto.

---

## 3. GitHub Pages (lo que ya está montado)

### Cómo funciona

```
git push origin main
      │
      ▼
GitHub Actions detecta el push
      │
      ├── npm ci          instala dependencias
      ├── npm run build   genera dist/
      └── deploy-pages    publica dist/ en Pages
                              │
                              ▼
              https://ruber9125.github.io/automatiza360-landing/
```

Todo está en `.github/workflows/deploy.yml`. No tienes que hacer nada más que `git push`: en aproximadamente un minuto la web está actualizada.

### La pieza que rompe a todo el mundo: `base`

GitHub Pages sirve los proyectos desde una **subcarpeta**, no desde la raíz del dominio:

```
https://ruber9125.github.io/automatiza360-landing/
                            └────────┬─────────┘
                              nombre del repo
```

Si no se lo dices a Vite, el HTML pedirá los archivos a `/assets/index.js` — la raíz del dominio — donde no hay nada. Resultado: **página en blanco**, sin errores visibles salvo unos 404 en la consola.

La solución está en `vite.config.js`:

```js
const BASE_PRODUCCION = '/automatiza360-landing/'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? BASE_PRODUCCION : '/',
  ...
}))
```

Es condicional a propósito: en producción cuelga de la subcarpeta, pero en desarrollo sigue en la raíz, para que `localhost:5173` no lleve la subcarpeta pegada mientras trabajas.

> **Si renombras el repositorio, actualiza `BASE_PRODUCCION`.** Es el fallo número uno al desplegar en Pages.

### Activarlo desde cero en otro repo

1. Sube el proyecto con el workflow `.github/workflows/deploy.yml`.
2. En GitHub: **Settings → Pages → Source → GitHub Actions**.
3. `git push` a `main`. Mira el progreso en la pestaña **Actions**.

### Desplegar a mano

En **Actions → Desplegar en GitHub Pages → Run workflow**. Útil si quieres republicar sin cambiar código.

---

## 4. Desplegar en Vercel

1. Entra en [vercel.com](https://vercel.com) con tu cuenta de GitHub.
2. **Add New → Project** y elige el repositorio.
3. Vercel detecta Vite solo. Confirma:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Deploy**.

⚠️ **Importante:** Vercel sirve desde la **raíz** del dominio, no desde una subcarpeta. Hay que quitar la `base`:

```js
// vite.config.js
export default defineConfig({
  base: '/',
  plugins: [react()],
})
```

Si dejas la base de GitHub Pages, la web se verá en blanco en Vercel. Es el mismo error del apartado anterior, al revés.

Cada push a `main` redespliega. Cada Pull Request genera una URL de vista previa.

---

## 5. Desplegar en Netlify

1. Entra en [netlify.com](https://netlify.com) con GitHub.
2. **Add new site → Import an existing project**.
3. Configuración:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. **Deploy site**.

Aplica el mismo aviso sobre `base: '/'` que en Vercel.

Para el formulario de contacto sin backend, añade `netlify` y `name` al `<form>` y Netlify recoge los envíos en su panel:

```html
<form name="contacto" method="POST" data-netlify="true">
```

---

## 6. Conectar un dominio propio

Supongamos que compras `automatiza360.com` en un registrador (Namecheap, Cloudflare, IONOS, GoDaddy…).

### En GitHub Pages

**Paso 1 — DNS.** En el panel de tu registrador, crea estos registros:

| Tipo | Nombre | Valor |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `ruber9125.github.io` |

**Paso 2 — GitHub.** En **Settings → Pages → Custom domain**, escribe `automatiza360.com` y guarda. GitHub crea un archivo `CNAME` en el repo.

**Paso 3 — HTTPS.** Espera a que se verifique el dominio (de minutos a 24 h) y marca **Enforce HTTPS**. El certificado es gratuito y se renueva solo.

**Paso 4 — la `base`.** Con dominio propio el sitio pasa a servirse desde la raíz, así que hay que quitar la subcarpeta:

```js
base: '/',
```

Y actualiza también las URL absolutas de `index.html` (`canonical`, `og:url`, `og:image`).

### En Vercel o Netlify

Más simple: en el panel del proyecto, **Domains → Add**, escribe el dominio y sigue las instrucciones. Ambos te dan los registros DNS exactos y gestionan el certificado. No hay que tocar `base` porque ya sirven desde la raíz.

### Cuánto tarda

Los cambios de DNS se propagan entre 10 minutos y 48 horas, según el registrador y la caché de tu proveedor de internet. Si tras unas horas no funciona, comprueba los registros con:

```bash
nslookup automatiza360.com
```

---

## 7. Lista de comprobación antes de publicar

- [ ] `npm run build` termina sin errores
- [ ] `npm run preview` se ve correctamente (es lo que verán los visitantes)
- [ ] La `base` de `vite.config.js` corresponde a dónde vas a publicar
- [ ] El número de WhatsApp está configurado en `content.js`
- [ ] Los testimonios y métricas son datos reales, no los de demostración
- [ ] Las URL de `index.html` (`canonical`, `og:url`, `og:image`) apuntan al dominio final
- [ ] Comprobado en móvil real, no solo en el simulador del navegador
