import { useEffect, useRef, useState } from 'react';

/**
 * Anima la entrada de su contenido cuando aparece en pantalla.
 * Usa IntersectionObserver: sin librerías externas.
 * `delay` en ms permite escalonar listas de tarjetas.
 */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
  const ref = useRef(null);

  // Si el navegador no soporta IntersectionObserver, arrancamos ya visibles.
  // Sin este respaldo el contenido se quedaria en opacity: 0 para siempre.
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === 'undefined'
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
