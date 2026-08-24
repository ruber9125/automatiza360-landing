import Section from '../ui/Section';
import Reveal from '../ui/Reveal';
import { useCases } from '../../data/content';
import './UseCases.css';

export default function UseCases() {
  return (
    <Section
      id="casos-de-uso"
      tone="alt"
      eyebrow={useCases.eyebrow}
      title={useCases.title}
      subtitle={useCases.subtitle}
    >
      <div className="uc__grid">
        {useCases.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 60} className="uc__item">
            <article className="uc__card">
              <span className="uc__tag">{item.tag}</span>
              <h3 className="uc__title">{item.title}</h3>
              <p className="uc__text">{item.text}</p>
              <span className="uc__glow" aria-hidden="true" />
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
