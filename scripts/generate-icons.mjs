/**
 * GENERADOR DE ICONOS — Automatiza360
 *
 * Rasteriza el logo "Ciclo 360" a los PNG que necesitan los navegadores y
 * dispositivos móviles, y monta el favicon.ico. Sin dependencias externas:
 * dibuja con supermuestreo y codifica el PNG a mano con el zlib de Node.
 *
 * Ejecutar:  npm run icons
 * Salida:    public/
 *
 * Si cambias el logo en src/components/ui/Logo.jsx, ajusta también la
 * geometría de GEOMETRIA aquí abajo y vuelve a lanzarlo.
 */

import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const SALIDA = join(RAIZ, 'public');

/* ------------------------------------------------------------------ */
/* Paleta y geometría (en unidades normalizadas 0..1 del lado del icono) */
/* ------------------------------------------------------------------ */

const COLOR_DESDE = [0x4f, 0x7c, 0xff]; // --brand-500
const COLOR_HASTA = [0x22, 0xd3, 0xee]; // --accent-500
const COLOR_MARCA = [0x05, 0x12, 0x2b]; // navy oscuro, igual que el texto del CTA

const GEOMETRIA = {
  radioFondo: 0.22, // esquinas del cuadrado redondeado
  anilloMedio: 0.335, // radio medio del anillo
  anilloGrosor: 0.055, // media anchura del trazo
  huecoDesde: -62, // grados: inicio del hueco (abajo a la derecha)
  huecoHasta: -8, // grados: fin del hueco
  nodoAngulo: -35, // grados: posición del nodo viajero
  nodoRadio: 0.088,
  nucleoRadio: 0.078,
};

const MUESTRAS = 4; // supermuestreo 4x4 por píxel

/* ------------------------------------------------------------------ */
/* Dibujo                                                              */
/* ------------------------------------------------------------------ */

const grados = (rad) => (rad * 180) / Math.PI;

/**
 * ¿Cae el punto (x,y) normalizado dentro del cuadrado redondeado?
 * Distancia con signo a un "rounded box": desplazamos el punto al primer
 * cuadrante, medimos contra el rectángulo interior y redondeamos la esquina.
 */
function dentroDelFondo(x, y, r = GEOMETRIA.radioFondo) {
  const dx = Math.abs(x - 0.5) - (0.5 - r);
  const dy = Math.abs(y - 0.5) - (0.5 - r);
  const distancia =
    Math.hypot(Math.max(dx, 0), Math.max(dy, 0)) + Math.min(Math.max(dx, dy), 0) - r;
  return distancia <= 0;
}

/**
 * ¿Cae el punto dentro de alguna parte de la marca (anillo, nodo o núcleo)?
 * `escala` encoge la marca respecto al centro sin tocar la geometría base:
 * lo usa la variante maskable, que necesita margen porque Android recorta.
 */
function dentroDeLaMarca(x, y, escala = 1) {
  const dx = (x - 0.5) / escala;
  const dy = (y - 0.5) / escala;
  const dist = Math.hypot(dx, dy);

  // Núcleo central
  if (dist <= GEOMETRIA.nucleoRadio) return true;

  // Nodo viajero
  const a = (GEOMETRIA.nodoAngulo * Math.PI) / 180;
  const nx = 0.5 + GEOMETRIA.anilloMedio * Math.cos(a);
  const ny = 0.5 - GEOMETRIA.anilloMedio * Math.sin(a);
  if (Math.hypot(0.5 + dx - nx, 0.5 + dy - ny) <= GEOMETRIA.nodoRadio) return true;

  // Anillo abierto: dentro del grosor y fuera del hueco angular
  const dentroDelGrosor =
    Math.abs(dist - GEOMETRIA.anilloMedio) <= GEOMETRIA.anilloGrosor;
  if (!dentroDelGrosor) return false;

  const ang = grados(Math.atan2(-dy, dx)); // -180..180, y invertida como en SVG
  const enElHueco = ang > GEOMETRIA.huecoDesde && ang < GEOMETRIA.huecoHasta;
  return !enElHueco;
}

/** Color del degradado del fondo en diagonal. */
function colorFondo(x, y) {
  const t = Math.min(1, Math.max(0, (x + y) / 2));
  return [
    Math.round(COLOR_DESDE[0] + (COLOR_HASTA[0] - COLOR_DESDE[0]) * t),
    Math.round(COLOR_DESDE[1] + (COLOR_HASTA[1] - COLOR_DESDE[1]) * t),
    Math.round(COLOR_DESDE[2] + (COLOR_HASTA[2] - COLOR_DESDE[2]) * t),
  ];
}

/**
 * Devuelve un buffer RGBA de lado x lado.
 *   radioFondo  → 0 da un cuadrado a sangre (para el icono maskable)
 *   escalaMarca → < 1 deja margen alrededor de la marca
 */
function rasterizar(lado, { radioFondo = GEOMETRIA.radioFondo, escalaMarca = 1 } = {}) {
  const pixeles = Buffer.alloc(lado * lado * 4);

  for (let py = 0; py < lado; py++) {
    for (let px = 0; px < lado; px++) {
      let coberturaFondo = 0;
      let coberturaMarca = 0;
      let sumaR = 0;
      let sumaG = 0;
      let sumaB = 0;

      // Supermuestreo: promediamos MUESTRAS x MUESTRAS puntos por píxel
      for (let sy = 0; sy < MUESTRAS; sy++) {
        for (let sx = 0; sx < MUESTRAS; sx++) {
          const x = (px + (sx + 0.5) / MUESTRAS) / lado;
          const y = (py + (sy + 0.5) / MUESTRAS) / lado;

          if (!dentroDelFondo(x, y, radioFondo)) continue;
          coberturaFondo++;

          if (dentroDeLaMarca(x, y, escalaMarca)) {
            coberturaMarca++;
            sumaR += COLOR_MARCA[0];
            sumaG += COLOR_MARCA[1];
            sumaB += COLOR_MARCA[2];
          } else {
            const [r, g, b] = colorFondo(x, y);
            sumaR += r;
            sumaG += g;
            sumaB += b;
          }
        }
      }

      const i = (py * lado + px) * 4;
      const total = MUESTRAS * MUESTRAS;

      if (coberturaFondo === 0) {
        pixeles[i] = pixeles[i + 1] = pixeles[i + 2] = pixeles[i + 3] = 0;
        continue;
      }

      pixeles[i] = Math.round(sumaR / coberturaFondo);
      pixeles[i + 1] = Math.round(sumaG / coberturaFondo);
      pixeles[i + 2] = Math.round(sumaB / coberturaFondo);
      pixeles[i + 3] = Math.round((coberturaFondo / total) * 255);
    }
  }

  return pixeles;
}

/* ------------------------------------------------------------------ */
/* Codificación PNG                                                    */
/* ------------------------------------------------------------------ */

const TABLA_CRC = (() => {
  const tabla = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    tabla[n] = c;
  }
  return tabla;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = TABLA_CRC[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function trozo(tipo, datos) {
  const largo = Buffer.alloc(4);
  largo.writeUInt32BE(datos.length);
  const cuerpo = Buffer.concat([Buffer.from(tipo, 'ascii'), datos]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(cuerpo));
  return Buffer.concat([largo, cuerpo, crc]);
}

function codificarPng(pixeles, lado) {
  // Cada línea va precedida de un byte de filtro (0 = sin filtro)
  const crudo = Buffer.alloc(lado * (lado * 4 + 1));
  for (let y = 0; y < lado; y++) {
    crudo[y * (lado * 4 + 1)] = 0;
    pixeles.copy(crudo, y * (lado * 4 + 1) + 1, y * lado * 4, (y + 1) * lado * 4);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(lado, 0);
  ihdr.writeUInt32BE(lado, 4);
  ihdr[8] = 8; // profundidad de bits
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; // compresión
  ihdr[11] = 0; // filtro
  ihdr[12] = 0; // sin entrelazado

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    trozo('IHDR', ihdr),
    trozo('IDAT', deflateSync(crudo, { level: 9 })),
    trozo('IEND', Buffer.alloc(0)),
  ]);
}

/** ICO moderno: envuelve directamente un PNG (soportado desde Windows Vista). */
function codificarIco(png, lado) {
  const cabecera = Buffer.alloc(6);
  cabecera.writeUInt16LE(0, 0); // reservado
  cabecera.writeUInt16LE(1, 2); // tipo: icono
  cabecera.writeUInt16LE(1, 4); // número de imágenes

  const entrada = Buffer.alloc(16);
  entrada[0] = lado === 256 ? 0 : lado; // ancho (0 significa 256)
  entrada[1] = lado === 256 ? 0 : lado; // alto
  entrada[2] = 0; // colores de la paleta
  entrada[3] = 0; // reservado
  entrada.writeUInt16LE(1, 4); // planos
  entrada.writeUInt16LE(32, 6); // bits por píxel
  entrada.writeUInt32LE(png.length, 8);
  entrada.writeUInt32LE(22, 12); // desplazamiento de los datos

  return Buffer.concat([cabecera, entrada, png]);
}

/* ------------------------------------------------------------------ */
/* Ejecución                                                           */
/* ------------------------------------------------------------------ */

mkdirSync(SALIDA, { recursive: true });

const ARCHIVOS = [
  { nombre: 'favicon-32.png', lado: 32 },
  { nombre: 'apple-touch-icon.png', lado: 180 },
  { nombre: 'icon-192.png', lado: 192 },
  { nombre: 'icon-512.png', lado: 512 },
  // Android recorta el icono a la forma del sistema: fondo a sangre y
  // la marca al 62% para que no se coma nada del anillo.
  { nombre: 'icon-maskable-512.png', lado: 512, opciones: { radioFondo: 0, escalaMarca: 0.62 } },
];

for (const { nombre, lado, opciones } of ARCHIVOS) {
  const png = codificarPng(rasterizar(lado, opciones), lado);
  writeFileSync(join(SALIDA, nombre), png);
  console.log(`  ${nombre.padEnd(22)} ${lado}x${lado}  ${(png.length / 1024).toFixed(1)} kB`);
}

const png32 = codificarPng(rasterizar(32), 32);
const ico = codificarIco(png32, 32);
writeFileSync(join(SALIDA, 'favicon.ico'), ico);
console.log(`  ${'favicon.ico'.padEnd(22)} 32x32  ${(ico.length / 1024).toFixed(1)} kB`);

console.log('\nIconos generados en public/');
