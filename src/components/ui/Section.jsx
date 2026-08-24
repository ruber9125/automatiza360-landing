import './Section.css';
import Reveal from './Reveal';

/**
 * Envoltorio de sección: se encarga del ritmo vertical, el fondo
 * y la cabecera (eyebrow + título + subtítulo).
 * tone: 'base' | 'alt'  → fondo de la banda
 * align: 'center' | 'left'
 */
export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  tone = 'base',
  align = 'center',
  children,
  className = '',
  headerMax,
}) {
  const hasHeader = eyebrow || title || subtitle;

  return (
    <section
      id={id}
      className={`section section--${tone} section--${align} ${className}`.trim()}
    >
      <div className="container">
        {hasHeader && (
          <Reveal>
            <header className="section__head" style={headerMax ? { maxWidth: headerMax } : undefined}>
              {eyebrow && <p className="eyebrow">{eyebrow}</p>}
              {title && <h2 className="section__title">{title}</h2>}
              {subtitle && <p className="lead section__subtitle">{subtitle}</p>}
            </header>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
