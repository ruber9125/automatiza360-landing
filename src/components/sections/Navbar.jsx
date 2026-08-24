import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { brand, nav } from '../../data/content';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bloquea el scroll del body mientras el menu movil esta abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="container navbar__inner">
        <a className="navbar__brand" href="#top" onClick={close}>
          <span className="navbar__mark" aria-hidden="true">
            <span className="navbar__mark-dot" />
          </span>
          <span className="navbar__name">{brand.name}</span>
        </a>

        <div className="navbar__menu">
          <nav className="navbar__links" aria-label="Navegacion principal">
            {nav.map((item) => (
              <a key={item.href} className="navbar__link" href={item.href} onClick={close}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="navbar__actions">
            <Button href={brand.calendarUrl} variant="primary" icon={false} onClick={close}>
              {brand.ctaPrimary}
            </Button>
          </div>
        </div>

        <button
          className="navbar__toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
