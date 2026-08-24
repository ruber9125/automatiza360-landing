import Button from '../ui/Button';
import Icon from '../ui/Icon';
import Reveal from '../ui/Reveal';
import { brand, finalCta } from '../../data/content';
import { propsCtaPrincipal } from '../../lib/cta';
import './FinalCta.css';

export default function FinalCta() {
  return (
    <section className="fcta" id="reservar">
      <div className="container">
        <Reveal>
          <div className="fcta__box">
            <div className="fcta__glow" aria-hidden="true" />

            <p className="eyebrow">{finalCta.eyebrow}</p>
            <h2 className="fcta__title">{finalCta.title}</h2>
            <p className="lead fcta__subtitle">{finalCta.subtitle}</p>

            <ul className="fcta__points">
              {finalCta.points.map((p) => (
                <li key={p}>
                  <Icon name="check" size={14} strokeWidth={2.6} />
                  {p}
                </li>
              ))}
            </ul>

            <div className="fcta__actions">
              <Button {...propsCtaPrincipal()} variant="primary" size="lg">
                {brand.ctaPrimary}
              </Button>
              <Button href="#casos-de-uso" variant="secondary" size="lg">
                Ver casos de uso
              </Button>
            </div>

            <p className="fcta__note">
              Respondemos en menos de 24 h. Sin llamadas de venta agresivas, solo un plan claro.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
