import { useState } from 'react';
import Section from '../ui/Section';
import Reveal from '../ui/Reveal';
import { faq } from '../../data/content';
import './Faq.css';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Section id="faq" tone="alt" eyebrow={faq.eyebrow} title={faq.title}>
      <div className="faq">
        {faq.items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <Reveal key={item.q} delay={i * 60}>
              <div className={`faq__item ${isOpen ? 'is-open' : ''}`}>
                <button
                  className="faq__question"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span className="faq__icon" aria-hidden="true">
                    <i />
                    <i />
                  </span>
                </button>
                <div className="faq__answer" role="region">
                  <p>{item.a}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
