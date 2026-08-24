import Section from '../ui/Section';
import Reveal from '../ui/Reveal';
import { testimonials } from '../../data/content';
import './Testimonials.css';

export default function Testimonials() {
  return (
    <Section
      id="testimonios"
      tone="base"
      eyebrow={testimonials.eyebrow}
      title={testimonials.title}
    >
      <div className="grid grid--3 tst__grid">
        {testimonials.items.map((t, i) => (
          <Reveal key={t.name} delay={i * 100}>
            <figure className="tst__card">
              <span className="tst__quote" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="tst__text">{t.quote}</blockquote>
              <figcaption className="tst__author">
                <span className="tst__avatar">{t.initials}</span>
                <span>
                  <strong>{t.name}</strong>
                  <em>{t.role}</em>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
