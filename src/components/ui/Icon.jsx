/**
 * Set de iconos en linea (SVG, stroke = currentColor).
 * Anade uno nuevo agregando una entrada a `paths`.
 */
const paths = {
  bolt: <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" />,
  chat: (
    <path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.3A8 8 0 1 1 21 12Z" />
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  link: (
    <>
      <path d="M10 13.5a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 0 0-5.7-5.7l-1.4 1.4" />
      <path d="M14 10.5a4 4 0 0 0-5.7 0l-2.8 2.8a4 4 0 0 0 5.7 5.7l1.4-1.4" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20h16" />
      <path d="M7 20v-6M12 20V6M17 20v-9" />
    </>
  ),
  shield: <path d="M12 3 5 6v6c0 4.2 2.9 7.8 7 9 4.1-1.2 7-4.8 7-9V6l-7-3Z" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  spark: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M6.3 6.3 9 9M15 15l2.7 2.7M17.7 6.3 15 9M9 15l-2.7 2.7" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v5M12 16h.01" />
    </>
  ),

  /* --- Iconos de la seccion de problemas --- */
  snow: (
    <>
      <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
      <path d="M9.4 4.6 12 7.2l2.6-2.6M9.4 19.4 12 16.8l2.6 2.6" />
    </>
  ),
  bellOff: (
    <>
      <path d="M9.6 19a2.5 2.5 0 0 0 4.8 0" />
      <path d="M18 13.6V10a6 6 0 0 0-7.8-5.7" />
      <path d="M6.1 8.2A6 6 0 0 0 6 10v3.6L4.4 16.2h12.2" />
      <path d="M3 3l18 18" />
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="12" height="12" rx="2.5" />
      <path d="M5.5 15H4.5A2.5 2.5 0 0 1 2 12.5v-8A2.5 2.5 0 0 1 4.5 2h8A2.5 2.5 0 0 1 15 4.5v1" />
    </>
  ),
  unlink: (
    <>
      <path d="M10 14 7.5 16.5a3.5 3.5 0 1 1-5-5L5 9" />
      <path d="M14 10l2.5-2.5a3.5 3.5 0 1 1 5 5L19 15" />
      <path d="M15 4.6V2M19.4 9H22M9 19.4V22M4.6 15H2" />
    </>
  ),
  inbox: (
    <>
      <path d="M2.6 13h4.6l1.5 3h6.6l1.5-3h4.6" />
      <path d="M5.4 5.5 2.6 13v5a2 2 0 0 0 2 2h14.8a2 2 0 0 0 2-2v-5l-2.8-7.5A2 2 0 0 0 16.7 4H7.3a2 2 0 0 0-1.9 1.5Z" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="7.8" r="3.6" />
      <path d="M2.6 20a6.4 6.4 0 0 1 12.8 0" />
      <path d="M16.6 5a3.6 3.6 0 0 1 0 6.6" />
      <path d="M18 14.8a6.4 6.4 0 0 1 3.4 5.2" />
    </>
  ),
};

export default function Icon({ name, size = 22, strokeWidth = 1.6, className = '' }) {
  const node = paths[name];
  if (!node) return null;

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {node}
    </svg>
  );
}
