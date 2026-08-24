import { brand, footer } from '../../data/content';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a className="footer__logo" href="#top">
              <span className="footer__mark" aria-hidden="true">
                <span />
              </span>
              {brand.name}
            </a>
            <p className="footer__desc">{footer.description}</p>
            <a className="footer__mail" href={`mailto:${brand.email}`}>
              {brand.email}
            </a>
          </div>

          {footer.columns.map((col) => (
            <nav className="footer__col" key={col.title} aria-label={col.title}>
              <h3 className="footer__col-title">{col.title}</h3>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="footer__col footer__cta">
            <h3 className="footer__col-title">¿Empezamos?</h3>
            <p>Diagnóstico gratuito de 30 minutos, sin compromiso.</p>
            <a className="footer__cta-link" href={brand.calendarUrl}>
              {brand.ctaPrimary} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {brand.name}. Todos los derechos reservados.
          </p>
          <ul className="footer__legal">
            {footer.legal.map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
