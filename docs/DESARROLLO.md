# Desarrollo

Instalar, ejecutar y hacer cambios en el proyecto.

---

## 1. Requisitos

- **Node.js 18 o superior** (`node -v` para comprobarlo). Se recomienda Node 20+.
- **npm** (viene con Node).
- Un editor. VS Code va bien.

No hace falta base de datos, ni backend, ni cuenta en ningún servicio.

---

## 2. Instalación

```bash
git clone https://github.com/ruber9125/automatiza360-landing.git
cd automatiza360-landing
npm install
```

`npm install` descarga las dependencias a `node_modules/`, una carpeta que **no** está en el repositorio (pesa cientos de MB y se regenera sola). Lo que sí está es `package-lock.json`, que fija las versiones exactas para que tu instalación sea idéntica a la de cualquier otra persona.

---

## 3. Ejecutar en local

```bash
npm run dev
```

Abre `http://localhost:5173` automáticamente.

Lo que hace Vite mientras trabajas:

- **Recarga en caliente (HMR)** — al guardar un `.jsx` o un `.css`, el navegador aplica el cambio sin recargar la página ni perder el scroll.
- **Sin compilación previa** — sirve los módulos directamente al navegador, por eso arranca en menos de medio segundo.

Para pararlo: `Ctrl + C` en la terminal.

### Verlo desde el móvil

Útil para comprobar el responsive de verdad:

```bash
npm run dev -- --host
```

Vite imprime una dirección de red (`http://192.168.x.x:5173`). Ábrela en el móvil, conectado al mismo wifi.

---

## 4. Generar el build

```bash
npm run build
```

Produce `dist/`: HTML, un CSS y un JS minificados, con hash en el nombre para invalidar cachés, más los archivos de `public/` copiados tal cual.

Para comprobar el resultado antes de publicar:

```bash
npm run preview
```

Sirve `dist/` en `http://localhost:4173`. **Esto es lo que verán tus visitantes**, así que es el sitio correcto para detectar cualquier cosa que funcione en desarrollo pero no en producción.

---

## 5. Cómo hacer los cambios más habituales

### Cambiar un texto

Todo el copy vive en `src/data/content.js`. Busca la sección y edita:

```js
export const hero = {
  titleTop: 'Tu negocio puede vender más',
  titleGradient: 'trabajando menos horas',   // ← la parte con degradado
  subtitle: '…',
};
```

No hace falta tocar ningún componente.

### Cambiar los colores

En `src/styles/tokens.css`:

```css
--brand-500: #4f7cff;   /* azul principal: botones, enlaces, acentos */
--accent-500: #22d3ee;  /* cian de apoyo: degradados, iconos */
```

Cambia esos dos y toda la web se recolorea, incluido el logo. Los fondos están justo debajo (`--bg-base`, `--bg-alt`, `--surface-1`).

**Truco para iterar rápido:** abre las DevTools del navegador (F12), selecciona el elemento `<html>` y edita las variables en vivo en el panel de estilos. Cuando encuentres el valor que te gusta, cópialo a `tokens.css`.

### Ajustar espaciados

```css
--section-py: clamp(4.5rem, 3rem + 7vw, 8rem);  /* aire arriba y abajo de cada sección */
--container: 1180px;                             /* ancho máximo del contenido */
--gutter: clamp(1.25rem, 0.6rem + 2.5vw, 2.5rem); /* margen lateral */
```

La escala `--space-1` … `--space-9` es la que usan los componentes internamente. Si cambias esos valores, cambia el ritmo de toda la interfaz a la vez.

### Reordenar o quitar secciones

En `src/App.jsx`, mueve o borra la línea correspondiente:

```jsx
<Hero />
<Metrics />
<Problems />    {/* ← borra esta línea y la sección desaparece */}
<Benefits />
```

### Añadir una sección nueva

1. Crea `src/components/sections/MiSeccion.jsx` y `MiSeccion.css`.
2. Usa el envoltorio `Section` para heredar el ritmo vertical y la cabecera:

```jsx
import Section from '../ui/Section';
import Reveal from '../ui/Reveal';
import './MiSeccion.css';

export default function MiSeccion() {
  return (
    <Section id="mi-seccion" tone="alt" eyebrow="Etiqueta" title="Titular">
      <Reveal>
        <p>Contenido</p>
      </Reveal>
    </Section>
  );
}
```

3. Impórtala en `App.jsx` y colócala donde toque.
4. Si debe aparecer en el menú, añádela al array `nav` de `content.js`.

### Añadir un icono

En `src/components/ui/Icon.jsx`, agrega una entrada al objeto `paths` con contenido SVG sobre un lienzo de 24×24:

```js
estrella: <path d="M12 3l2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 17l-5.6 3.1 1.4-6.3L3 9.5l6.4-.6L12 3Z" />,
```

Úsalo con `<Icon name="estrella" size={20} />`. El color lo hereda del contenedor.

### Cambiar el logo

El logo vive en `src/components/ui/Logo.jsx` como SVG inline. Tras modificarlo, regenera los favicons:

```bash
npm run icons
```

Ese comando ejecuta `scripts/generate-icons.mjs`, que rasteriza el logo a PNG (32, 180, 192, 512 px), crea la variante *maskable* para Android y monta el `favicon.ico`. Si cambias la geometría del SVG, ajusta también el objeto `GEOMETRIA` del script para que ambos coincidan.

También hay versiones sueltas en `public/`: `logo-mark.svg` (solo icono) y `logo-full.svg` (icono + nombre), para usar fuera de la web.

### Cambiar a dónde lleva el CTA

Por defecto abre WhatsApp. Configura el número en `content.js`:

```js
export const contact = {
  whatsappNumber: '34612345678',
  whatsappMessage: 'Hola, quiero agendar una llamada…',
};
```

Si prefieres otro destino (Calendly, un formulario, un teléfono), edita **una sola función** en `src/lib/cta.js`:

```js
export function propsCtaPrincipal(mensaje) {
  return { href: 'https://calendly.com/tu-usuario/30min', target: '_blank', rel: 'noopener noreferrer' };
}
```

Los cinco botones de la página se actualizan solos.

---

## 6. Convenciones del código

- **Nombres de clase tipo BEM**: `.bloque__elemento--modificador` (`.hero__title`, `.btn--primary`). Cada sección usa su propio prefijo, así que no hay colisiones aunque el CSS sea global.
- **Nada de colores literales en los componentes.** Si necesitas un color, sale de un token. Si no existe el token, créalo.
- **Un componente = un archivo + su CSS hermano** con el mismo nombre.
- **Comentarios sobre el *porqué*, no sobre el *qué*.** El código ya dice qué hace; los comentarios explican decisiones que no son evidentes.

---

## 7. Problemas frecuentes

| Síntoma | Causa y solución |
|---|---|
| `npm run dev` falla con error de módulo | Borra `node_modules` y `package-lock.json`, y vuelve a `npm install`. |
| El puerto 5173 está ocupado | `npm run dev -- --port 3000`. |
| Cambio un color y no pasa nada | Comprueba que editas `tokens.css` y no un valor literal que quedó en un componente. Búscalo con `grep -rn "#4f7cff" src`. |
| La página se ve en blanco tras `npm run build` | Casi siempre es la `base` de `vite.config.js`. Ver [DESPLIEGUE.md](DESPLIEGUE.md). |
| Los favicons no cambian | El navegador los cachea con fuerza. Prueba en ventana privada o vacía la caché con `Ctrl + Shift + R`. |
| Aviso en consola sobre el número de WhatsApp | Es intencionado: recuerda que el CTA aún no está configurado. Desaparece al rellenarlo. |
