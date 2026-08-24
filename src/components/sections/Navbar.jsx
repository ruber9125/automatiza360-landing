import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import Logo from '../ui/Logo';
import { brand, nav } from '../../data/content';
import { propsCtaPrincipal } from '../../lib/cta';
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

  // Escape cierra el menu, y al pasar a escritorio se cierra solo:
  // si no, el body se quedaria bloqueado tras girar el movil.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 980) setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="container navbar__inner">
        <a className="navbar__brand" href="#top" onClick={close} aria-label={`${brand.name} — inicio`}>
          <Logo />
        </a>

        <div className="navbar__menu" id="navbar-menu">
          <nav className="navbar__links" aria-label="Navegación principal">
            {nav.map((item) => (
              <a key={item.href} className="navbar__link" href={item.href} onClick={close}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="navbar__actions">
            <Button {...propsCtaPrincipal()} variant="primary" icon={false} onClick={close}>
              {brand.ctaPrimary}
            </Button>
          </div>
        </div>

        <button
          className="navbar__toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="navbar-menu"
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
