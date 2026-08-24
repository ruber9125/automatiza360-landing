import Button from '../ui/Button';
import Icon from '../ui/Icon';
import Reveal from '../ui/Reveal';
import HeroVisual from './HeroVisual';
import { brand, hero } from '../../data/content';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="top">
      {/* Capas decorativas de fondo (puro CSS, sin imágenes) */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__glow hero__glow--1" />
        <div className="hero__glow hero__glow--2" />
        <div className="hero__grid" />
      </div>

      <div className="container hero__inner">
        {/* --- Columna de copy --- */}
        <div className="hero__content">
          <Reveal>
            <a className="hero__badge" href={brand.calendarUrl}>
              <span className="hero__badge-dot" />
              {hero.badge}
              <span className="hero__badge-arrow">→</span>
            </a>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="hero__title">
              {hero.titleTop}{' '}
              <span className="text-gradient">{hero.titleGradient}</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="hero__subtitle">{hero.subtitle}</p>
          </Reveal>

          <Reveal delay={240}>
            <ul className="hero__bullets">
              {hero.bullets.map((b) => (
                <li key={b}>
                  <span className="hero__check">
                    <Icon name="check" size={13} strokeWidth={2.6} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={320}>
            <div className="hero__actions">
              <Button href={brand.calendarUrl} variant="primary" size="lg">
                {brand.ctaPrimary}
              </Button>
              <Button href="#como-funciona" variant="secondary" size="lg">
                {brand.ctaSecondary}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <p className="hero__proof">
              <span className="hero__avatars" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              {hero.proof}
            </p>
          </Reveal>
        </div>

        {/* --- Columna visual --- */}
        <Reveal delay={200} className="hero__visual">
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}
