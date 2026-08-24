import Reveal from '../ui/Reveal';
import { metrics } from '../../data/content';
import './Metrics.css';

export default function Metrics() {
  return (
    <section className="metrics" aria-label="Resultados medios">
      <div className="container">
        <div className="metrics__grid">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 90} className="metrics__cell">
              <p className="metrics__value">{m.value}</p>
              <p className="metrics__label">{m.label}</p>
              <p className="metrics__detail">{m.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
