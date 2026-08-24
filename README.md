# Automatiza360 — Landing page

Landing orientada a conversión construida con **React + Vite** y CSS plano con *design tokens*.
Sin frameworks de UI ni dependencias de estilos: todo es editable a mano en segundos.

## Levantar en local

```bash
npm install
npm run dev
```

Se abre en `http://localhost:5173`. Cualquier cambio en un `.jsx` o `.css` se refleja al instante (HMR).

Otros comandos:

```bash
npm run build     # build de producción en dist/
npm run preview   # sirve el build para comprobarlo
```

## Estructura

```
src/
├── main.jsx                  Punto de entrada (importa los 3 CSS globales)
├── App.jsx                   Orden de las secciones — reordena aquí
├── data/
│   └── content.js            TODO el copy de la landing
├── styles/
│   ├── tokens.css            Colores, tipografía, espaciados, radios, sombras
│   ├── global.css            Reset, tipografía base y utilidades (.container, .grid, .card)
│   └── animations.css        Reveal on scroll + keyframes
└── components/
    ├── ui/                   Reutilizables: Button, Section, Reveal, Icon
    └── sections/             Una carpeta plana con cada sección + su CSS al lado
```

## Cómo iterar visualmente

| Quiero cambiar… | Toco… |
|---|---|
| Textos, titulares, FAQ, testimonios | `src/data/content.js` |
| Paleta de color, gradientes | `src/styles/tokens.css` → bloques *Marca* y *Fondos* |
| Tamaño de los titulares | `src/styles/tokens.css` → `--fs-display`, `--fs-h2` |
| Aire entre secciones | `src/styles/tokens.css` → `--section-py` |
| Ancho máximo del contenido | `src/styles/tokens.css` → `--container` |
| Redondeo de tarjetas y botones | `--radius-*` |
| Velocidad de las animaciones | `--dur`, `--dur-slow`, `--ease` |
| Estilo de los CTA | `src/components/ui/Button.css` |
| Orden de las secciones | `src/App.jsx` |
| Una sección concreta | `src/components/sections/<Nombre>.css` |

Los tamaños de fuente y espaciados usan `clamp()`, así que el responsive escala solo:
cambiar un token ajusta móvil, tablet y desktop a la vez.

## Puntos clave de conversión

- **CTA principal** (`Reserva una llamada`) aparece en navbar, hero, sección "Cómo funciona",
  CTA final y footer. Todos apuntan a `brand.calendarUrl` en `content.js`.
- Para conectar tu calendario (Calendly, Cal.com, TidyCal…), sustituye
  `calendarUrl: '#reservar'` por tu enlace real en `src/data/content.js`.

## Detalles de implementación

- **Sin imágenes externas**: el mockup del hero (`HeroVisual.jsx`) es HTML + CSS,
  así que puedes editar cifras, pasos del flujo y etiquetas directamente.
- **Animaciones de entrada** con `IntersectionObserver` (`ui/Reveal.jsx`), escalonadas con la
  prop `delay`. Respetan `prefers-reduced-motion`.
- **Iconos** en línea en `ui/Icon.jsx`; añade uno nuevo agregando una entrada al objeto `paths`.
- **Rejillas responsive** con `auto-fit` + `minmax`, sin media queries innecesarias.
