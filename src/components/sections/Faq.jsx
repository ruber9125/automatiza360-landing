import { useId, useState } from 'react';
import Section from '../ui/Section';
import Reveal from '../ui/Reveal';
import { faq } from '../../data/content';
import './Faq.css';

export default function Faq() {
  const [abierta, setAbierta] = useState(0);
  const uid = useId();

  return (
    <Section id="faq" tone="alt" eyebrow={faq.eyebrow} title={faq.title}>
      <div className="faq">
        {faq.items.map((item, i) => {
          const estaAbierta = abierta === i;
          const idPregunta = `faq-p-${uid}-${i}`;
          const idRespuesta = `faq-r-${uid}-${i}`;

          return (
            <Reveal key={item.q} delay={i * 60}>
              <div className={`faq__item ${estaAbierta ? 'is-open' : ''}`}>
                <h3 className="faq__heading">
                  <button
                    id={idPregunta}
                    className="faq__question"
                    onClick={() => setAbierta(estaAbierta ? -1 : i)}
                    aria-expanded={estaAbierta}
                    aria-controls={idRespuesta}
                  >
                    <span>{item.q}</span>
                    <span className="faq__icon" aria-hidden="true">
                      <i />
                      <i />
                    </span>
                  </button>
                </h3>

                {/* Se mantiene en el DOM para poder animar la altura.
                    No se usa `hidden` porque fuerza display:none y romperia
                    la transicion; `inert` + aria-hidden consiguen lo mismo
                    (fuera del foco y del lector de pantalla) sin tocar el
                    layout. Sin esto, un lector leeria las seis respuestas
                    seguidas aunque esten colapsadas. */}
                <div
                  id={idRespuesta}
                  className="faq__answer"
                  role="region"
                  aria-labelledby={idPregunta}
                  aria-hidden={!estaAbierta}
                  inert={estaAbierta ? undefined : ''}
                >
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
