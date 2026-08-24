# Arquitectura

Cómo está construida la landing y por qué está construida así.

---

## 1. Tecnologías

| Pieza | Elección | Motivo |
|---|---|---|
| Librería de UI | **React 18** | La página es una lista de secciones reutilizables con estado puntual (menú móvil, acordeón). React lo resuelve sin ceremonia. |
| Empaquetador | **Vite 6** | Arranque instantáneo y recarga en caliente. Para una landing que se itera visualmente, el bucle de feedback importa más que cualquier otra cosa. |
| Estilos | **CSS nativo + custom properties** | Ver más abajo. |
| Iconos | **SVG inline** propio | Sin dependencias, recolorables con `currentColor`, sin peticiones de red. |
| Animación | **IntersectionObserver + CSS** | Una librería como Framer Motion pesaría más que toda la landing junta. |
| Despliegue | **GitHub Actions → GitHub Pages** | Gratis, sin servidor, automático en cada push. |

**Dependencias de producción: 2** (`react`, `react-dom`). Nada más.

### Por qué no Tailwind

Tailwind es excelente cuando el diseño ya está cerrado. Aquí el encargo era el contrario: *"que sea fácil retocar layout, espaciados y jerarquía visual después"*.

Con CSS y variables, cambiar el ritmo vertical de toda la web es editar una línea:

```css
--section-py: clamp(4.5rem, 3rem + 7vw, 8rem);
```

Con clases utilitarias, sería buscar y reemplazar `py-20` en once componentes. La elección no es ideológica: responde al objetivo declarado del proyecto.

---

## 2. El sistema de diseño

Todo el aspecto visual sale de `src/styles/tokens.css`. Son ~70 variables CSS agrupadas en:

```
Marca        --brand-500, --accent-500, --violet-500
Fondos       --bg-base, --bg-alt, --surface-1, --surface-2
Texto        --text-strong, --text-base, --text-muted
Bordes       --border-soft, --border-strong
Gradientes   --grad-brand, --grad-text, --grad-surface
Tipografía   --font-display, --font-body, --fs-display … --fs-xs
Espaciado    --space-1 … --space-9, --section-py, --container, --gutter
Radios       --radius-sm … --radius-pill
Sombras      --shadow-sm … --shadow-brand
Movimiento   --ease, --dur-fast, --dur, --dur-slow
```

Ningún componente inventa un color ni un espaciado propio: todos consumen tokens. Esa es la razón de que la web se sienta coherente, y de que cambiar `--brand-500` recoloree la página entera.

### Escalas fluidas

Los tamaños clave usan `clamp(mínimo, preferido, máximo)`:

```css
--fs-display: clamp(2.6rem, 1.4rem + 4.4vw, 4.4rem);
```

El titular del hero mide 2.6rem en un móvil pequeño y 4.4rem en escritorio, interpolando de forma continua. **No hay un solo `@media` para tipografía.** Las media queries se reservan para cambios de layout reales (el menú móvil, la rejilla del footer).

---

## 3. Estructura de carpetas

```
src/
├── main.jsx              Monta React e importa los 3 CSS globales (en orden)
├── App.jsx               Composición: el orden de las secciones
│
├── data/
│   └── content.js        Todo el copy + configuración de contacto
│
├── lib/
│   └── cta.js            Resuelve el destino del CTA principal
│
├── styles/
│   ├── tokens.css        Variables del sistema de diseño
│   ├── global.css        Reset, tipografía base, utilidades, accesibilidad
│   └── animations.css    Keyframes y la clase .reveal
│
└── components/
    ├── ui/               Piezas reutilizables, sin contenido propio
    │   ├── Button.jsx      Botón/enlace con 3 variantes
    │   ├── Section.jsx     Envoltorio: ritmo vertical + cabecera
    │   ├── Reveal.jsx      Animación de entrada al hacer scroll
    │   ├── Icon.jsx        Catálogo de iconos SVG
    │   └── Logo.jsx        Logo, en versión icono y completa
    │
    └── sections/         Una por bloque de la página, con su CSS al lado
```

**Regla que sigue toda la carpeta:** `ui/` no sabe nada del negocio; `sections/` no define estilos genéricos. Si un componente de `ui/` mencionara "Automatiza360", estaría en el sitio equivocado.

Cada componente tiene su CSS como archivo hermano (`Hero.jsx` + `Hero.css`). No es CSS Modules: son hojas globales importadas, y la separación se mantiene por convención de nombres tipo BEM (`.hero__title`, `.hv__step--brand`). Para un proyecto de este tamaño evita configuración sin coste real de colisiones.

---

## 4. Componentes reutilizables

### `Button`

```jsx
<Button href="..." variant="primary" size="lg">Reserva una llamada</Button>
<Button onClick={fn} variant="secondary">Ver más</Button>
```

Se renderiza como `<a>` si recibe `href`, y como `<button>` si no. Variantes: `primary` (degradado, el CTA), `secondary` (cristal), `ghost` (texto). Cualquier prop extra (`target`, `rel`, `onClick`) se reenvía al elemento.

### `Section`

Absorbe el patrón que repiten nueve secciones: ritmo vertical, fondo alterno y cabecera.

```jsx
<Section id="beneficios" tone="alt" eyebrow="Qué cambia" title="…" subtitle="…">
  {contenido}
</Section>
```

`tone="alt"` pinta la banda con `--bg-alt`, que es lo que crea el ritmo de bandas claras/oscuras al hacer scroll.

### `Reveal`

Envuelve cualquier cosa y la anima al entrar en pantalla, usando `IntersectionObserver`. La prop `delay` escalona listas:

```jsx
{items.map((item, i) => (
  <Reveal key={item.title} delay={i * 70}>…</Reveal>
))}
```

Se desconecta tras la primera aparición (no reanima al volver a subir) y arranca visible si el navegador no soporta `IntersectionObserver`.

### `Icon` y `Logo`

`Icon` es un catálogo: un objeto `paths` mapea nombre → contenido SVG, y el componente aporta el `<svg>` con `stroke="currentColor"`. Añadir un icono es añadir una entrada.

`Logo` dibuja el anillo abierto del "Ciclo 360" con degradados definidos vía `useId()`, para que dos logos en la misma página no compartan el `id` del gradiente — un fallo silencioso clásico de los SVG inline repetidos.

---

## 5. Flujo de la aplicación

```
index.html
   └── <div id="root">
         └── main.jsx        importa tokens.css → global.css → animations.css
               └── App.jsx
                     ├── skip-link
                     ├── Navbar          estado: scrolled, menú abierto
                     ├── <main>
                     │     ├── Hero ── HeroVisual
                     │     ├── Metrics
                     │     ├── Problems      ┐
                     │     ├── Benefits      │
                     │     ├── HowItWorks    ├─ todas envuelven <Section>
                     │     ├── UseCases      │  y leen de data/content.js
                     │     ├── Testimonials  │
                     │     ├── Faq           │  estado: pregunta abierta
                     │     └── FinalCta      ┘
                     └── Footer
```

**El orden de importación de los CSS en `main.jsx` importa**: `tokens` define las variables, `global` las consume, `animations` va al final para que sus reglas de `prefers-reduced-motion` ganen.

### Flujo de datos

No hay estado global, ni contexto, ni router. Es una única página estática con dos islas de estado local:

- `Navbar` — si la página está scrolleada, y si el menú móvil está abierto
- `Faq` — qué pregunta está desplegada

Todo lo demás son datos que fluyen en una dirección:

```
data/content.js  ──►  componente de sección  ──►  JSX
                 └──►  lib/cta.js  ──►  props del <Button>
```

### El CTA, en detalle

`lib/cta.js` es el único punto que decide a dónde lleva "Reserva una llamada":

```js
propsCtaPrincipal()
  │
  ├─ ¿hay contact.whatsappNumber con 8+ dígitos?
  │     SÍ → { href: 'https://wa.me/…?text=…', target: '_blank', rel: 'noopener noreferrer' }
  │     NO → { href: '#reservar' }
```

Los cinco puntos donde aparece el CTA hacen `<Button {...propsCtaPrincipal()}>`. Cambiar el destino (a Calendly, a un formulario, a un teléfono) es cambiar esta función, no cinco componentes.

---

## 6. El visual del hero

`HeroVisual.jsx` es el mockup de panel de la derecha. Está construido enteramente con HTML y CSS:

- **KPIs** — tres tarjetas con cifras
- **Flujo** — cuatro pasos con iconos, líneas conectoras y flotación desfasada
- **Gráfico** — barras cuyo alto sale de un array, animadas con `animation-delay` escalonado
- **Tarjetas flotantes** — conversación de IA y contador de horas, posicionadas en absoluto

En móvil (`< 620px`) la tarjeta de conversación pasa de `position: absolute` a flujo normal, y se oculta el tercer KPI para que las cifras no se aprieten.

La ventaja de que sea código y no una imagen: cambiar "47 leads hoy" es editar un número, no reabrir Figma.

---

## 7. Rendimiento

| Métrica | Valor |
|---|---|
| JS (gzip) | ~55 kB |
| CSS (gzip) | ~7 kB |
| Peticiones de imagen | 0 |
| Dependencias de producción | 2 |

Lo único que se pide a un tercero son las tipografías de Google Fonts, con `preconnect` y `display=swap` para que el texto no parpadee.
