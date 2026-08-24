import Section from '../ui/Section';
import Reveal from '../ui/Reveal';
import Icon from '../ui/Icon';
import { benefits } from '../../data/content';
import './Benefits.css';

export default function Benefits() {
  return (
    <Section
      id="beneficios"
      tone="alt"
      eyebrow={benefits.eyebrow}
      title={benefits.title}
      subtitle={benefits.subtitle}
    >
      <div className="grid grid--3 benefits__grid">
        {benefits.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 70}>
            <article className="card card--hover benefits__card">
              <span className="benefits__icon">
                <Icon name={item.icon} size={20} />
              </span>
              <h3 className="benefits__title">{item.title}</h3>
              <p className="benefits__text">{item.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
