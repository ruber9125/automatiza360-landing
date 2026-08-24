import { useId } from 'react';
import './Logo.css';

/**
 * LOGO DE AUTOMATIZA360 — concepto "Ciclo 360"
 *
 * Un anillo abierto (el ciclo continuo de automatización, y el "360" del nombre)
 * con un nodo que viaja por su recorrido y un núcleo central (la IA que decide).
 * El hueco del anillo es intencionado: el proceso fluye, no se cierra.
 *
 * Todo es vectorial y usa `currentColor` en el texto, así que hereda el color
 * del contenedor y funciona igual sobre fondo claro que sobre fondo oscuro.
 *
 * Uso:
 *   <Logo />                    → icono + nombre (por defecto)
 *   <Logo variant="mark" />     → solo el icono
 *   <Logo size={40} />          → tamaño del icono en px
 */
export default function Logo({ variant = 'full', size = 32, className = '' }) {
  // useId evita que dos logos en la misma página compartan el id del gradiente
  // (si se repitiera, el segundo logo heredaría el gradiente del primero).
  const uid = useId();
  const ringGradient = `logo-ring-${uid}`;
  const nodeGradient = `logo-node-${uid}`;

  const mark = (
    <svg
      className="logo__mark"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label="Automatiza360"
    >
      <defs>
        <linearGradient id={ringGradient} x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--logo-from, #4f7cff)" />
          <stop offset="100%" stopColor="var(--logo-to, #22d3ee)" />
        </linearGradient>
        <linearGradient id={nodeGradient} x1="21" y1="19" x2="28" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--logo-to, #22d3ee)" />
          <stop offset="100%" stopColor="var(--logo-from, #4f7cff)" />
        </linearGradient>
      </defs>

      {/* Anillo abierto: arco de 306° con el hueco abajo a la derecha */}
      <path
        d="M26.89 17.53A11 11 0 1 0 21.16 25.71"
        stroke={`url(#${ringGradient})`}
        strokeWidth="3.4"
        strokeLinecap="round"
      />

      {/* Nodo en movimiento, alojado en el hueco del anillo */}
      <circle cx="25.01" cy="22.31" r="2.9" fill={`url(#${nodeGradient})`} />

      {/* Núcleo */}
      <circle cx="16" cy="16" r="2.5" fill="var(--logo-from, #4f7cff)" />
    </svg>
  );

  if (variant === 'mark') {
    return <span className={`logo logo--mark ${className}`.trim()}>{mark}</span>;
  }

  return (
    <span className={`logo ${className}`.trim()}>
      {mark}
      <span className="logo__word">
        Automatiza<span className="logo__word-accent">360</span>
      </span>
    </span>
  );
}
