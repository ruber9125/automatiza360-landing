import Section from '../ui/Section';
import Reveal from '../ui/Reveal';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import { brand, howItWorks } from '../../data/content';
import { propsCtaPrincipal } from '../../lib/cta';
import './HowItWorks.css';

export default function HowItWorks() {
  return (
    <Section
      id="como-funciona"
      tone="base"
      eyebrow={howItWorks.eyebrow}
      title={howItWorks.title}
      subtitle={howItWorks.subtitle}
    >
      <ol className="hiw">
        {howItWorks.steps.map((step, i) => (
          <Reveal key={step.number} delay={i * 110} as="li" className="hiw__item">
            <article className="hiw__card">
              <div className="hiw__head">
                <span className="hiw__number">{step.number}</span>
                <span className="hiw__rule" aria-hidden="true" />
              </div>
              <h3 className="hiw__title">{step.title}</h3>
              <p className="hiw__text">{step.text}</p>
              <ul className="hiw__points">
                {step.points.map((p) => (
                  <li key={p}>
                    <Icon name="check" size={14} strokeWidth={2.4} />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={160}>
        <div className="hiw__cta">
          <p>Empieza por el paso 1. Es gratuito y no te compromete a nada.</p>
          <Button {...propsCtaPrincipal()} variant="primary">
            {brand.ctaPrimary}
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
