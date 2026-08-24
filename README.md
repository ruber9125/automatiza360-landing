<div align="center">

<img src="public/logo-mark.svg" width="72" alt="">

# Automatiza360 — Landing page

**Landing orientada a conversión para una empresa de automatización e IA.**
React + Vite, CSS con design tokens, sin frameworks de UI ni dependencias de estilos.

[**Ver la web en vivo →**](https://ruber9125.github.io/automatiza360-landing/)

![React](https://img.shields.io/badge/React-18.3-149ECA?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-design%20tokens-1572B6?logo=css3&logoColor=white)
![Deploy](https://img.shields.io/badge/deploy-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)

</div>

---

## Qué es esto

Una landing page comercial de una sola pantalla, construida para un objetivo concreto: **que el visitante reserve una llamada**. Todo el diseño está subordinado a eso — jerarquía visual, orden de las secciones y repetición del CTA en cinco puntos de la página.

No usa Tailwind, ni Bootstrap, ni una librería de componentes. Es CSS escrito a mano sobre un sistema de *design tokens*, precisamente para poder retocar la identidad visual completa desde un único archivo.

### Decisiones que definen el proyecto

| Decisión | Por qué |
|---|---|
| **CSS plano + variables**, no Tailwind | Permite cambiar la paleta, la escala tipográfica o el ritmo vertical de toda la web editando un archivo. Con clases utilitarias habría que tocar cada componente. |
| **Copy separado del layout** (`src/data/content.js`) | Los textos de una landing cambian constantemente. Nadie debería abrir un `.jsx` para corregir una coma. |
| **Cero imágenes externas** | El mockup del hero es HTML + CSS. La página carga sin peticiones de imágenes y el visual se edita como código. |
| **`clamp()` en vez de breakpoints** para tipografía y espaciado | El responsive escala de forma continua. Un solo token ajusta móvil, tablet y escritorio a la vez. |
| **Iconos y logo en SVG inline** | Sin peticiones extra, recolorables con `currentColor` y nítidos en cualquier pantalla. |

---

## Arranque rápido

Requisitos: **Node 18 o superior**.

```bash
git clone https://github.com/ruber9125/automatiza360-landing.git
cd automatiza360-landing
npm install
npm run dev
```

Abre `http://localhost:5173`.

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve `dist/` en local para comprobar el build |
| `npm run icons` | Regenera los favicons y los iconos de móvil desde el logo |

---

## ⚠️ Configuración pendiente

El botón **"Reserva una llamada"** abre una conversación de WhatsApp con el mensaje ya escrito. Necesita un número:

```js
// src/data/content.js
export const contact = {
  whatsappNumber: '34612345678',  // ← tu número, formato internacional, solo dígitos
  ...
};
```

Mientras esté vacío, los CTA hacen scroll al bloque de contacto en lugar de abrir WhatsApp. Es deliberado: es preferible eso a abrir una conversación contra un número inventado. Al rellenarlo, los **cinco CTA de la página** cambian a la vez.

---

## Estructura

```
├── public/                  Assets estáticos (favicons, logos SVG, manifest)
├── scripts/
│   └── generate-icons.mjs   Genera los PNG/ICO del favicon desde el logo
├── src/
│   ├── App.jsx              Orden de las secciones
│   ├── main.jsx             Punto de entrada
│   ├── data/content.js      ← TODO el copy de la landing
│   ├── lib/cta.js           Destino del CTA principal (WhatsApp o ancla)
│   ├── styles/
│   │   ├── tokens.css       ← Color, tipografía, espaciado, sombras
│   │   ├── global.css       Reset, utilidades, accesibilidad
│   │   └── animations.css   Entradas al hacer scroll
│   └── components/
│       ├── ui/              Reutilizables: Button, Section, Reveal, Icon, Logo
│       └── sections/        Las 11 secciones, cada una con su CSS al lado
└── .github/workflows/       Despliegue automático a GitHub Pages
```

Documentación detallada en [`docs/`](docs/):

- [**Arquitectura**](docs/ARQUITECTURA.md) — cómo encaja todo, componentes y flujo de datos
- [**Desarrollo**](docs/DESARROLLO.md) — instalar, ejecutar, y cómo hacer los cambios más habituales
- [**Despliegue**](docs/DESPLIEGUE.md) — de `localhost` a producción, y dominio propio
- [**GitHub y portafolio**](docs/GITHUB-Y-PORTAFOLIO.md) — qué se sube, qué nunca, y cómo presentar el repo

---

## Dónde tocar para cambiar algo

| Quiero cambiar… | Archivo |
|---|---|
| Textos, titulares, FAQ, testimonios | `src/data/content.js` |
| Número de WhatsApp / email | `src/data/content.js` → `contact` |
| Paleta de color y degradados | `src/styles/tokens.css` |
| Tamaño de los titulares | `src/styles/tokens.css` → `--fs-display`, `--fs-h2` |
| Aire entre secciones | `src/styles/tokens.css` → `--section-py` |
| Velocidad de las animaciones | `src/styles/tokens.css` → `--dur`, `--dur-slow` |
| Estilo de los botones | `src/components/ui/Button.css` |
| Orden de las secciones | `src/App.jsx` |
| Una sección concreta | `src/components/sections/<Nombre>.css` |
| El logo | `src/components/ui/Logo.jsx` + `npm run icons` |

---

## Accesibilidad

- Enlace de salto al contenido para navegación con teclado
- Contraste verificado sobre fondo oscuro (texto secundario ≈ 6:1, supera AA)
- Menú móvil cerrable con `Escape`, con `aria-expanded` y `aria-controls`
- Acordeón de FAQ con `inert` en los paneles cerrados, para que un lector de pantalla no lea las seis respuestas seguidas
- Todas las animaciones respetan `prefers-reduced-motion`
- Áreas táctiles de 44 px en pantallas de dedo

---

## Estado del contenido

> Los testimonios, las métricas y los datos de contacto son **contenido de demostración**. Sustitúyelos por datos reales antes de usar esta landing comercialmente.

---

## Licencia

MIT — ver [LICENSE](LICENSE).
