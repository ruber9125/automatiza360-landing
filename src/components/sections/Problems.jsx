import Section from '../ui/Section';
import Reveal from '../ui/Reveal';
import Icon from '../ui/Icon';
import { problems } from '../../data/content';
import './Problems.css';

export default function Problems() {
  return (
    <Section
      id="problemas"
      tone="base"
      eyebrow={problems.eyebrow}
      title={problems.title}
      subtitle={problems.subtitle}
    >
      <div className="grid grid--3 problems__grid">
        {problems.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 70}>
            <article className="problems__card">
              <span className="problems__icon">
                <Icon name={item.icon} size={20} strokeWidth={1.7} />
              </span>
              <h3 className="problems__title">{item.title}</h3>
              <p className="problems__text">{item.text}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <p className="problems__bridge">
          <span className="problems__bridge-line" aria-hidden="true" />
          Ninguno de estos problemas se arregla trabajando más horas. Se arreglan{' '}
          <strong>cambiando el proceso.</strong>
        </p>
      </Reveal>
    </Section>
  );
}
