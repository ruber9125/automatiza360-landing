import Icon from '../ui/Icon';
import './HeroVisual.css';

/**
 * Mockup de producto: panel de automatización con flujo, métricas
 * y una tarjeta flotante de conversación con IA.
 * Todo es HTML + CSS: fácil de retocar sin depender de imágenes.
 */

const flow = [
  { label: 'Nuevo lead', sub: 'Formulario web', icon: 'plus', tone: 'brand' },
  { label: 'Clasificación IA', sub: 'Intención alta · 92', icon: 'spark', tone: 'violet' },
  { label: 'WhatsApp + email', sub: 'Respuesta en 40 s', icon: 'chat', tone: 'accent' },
  { label: 'Reunión agendada', sub: 'Jueves · 10:30', icon: 'check', tone: 'success' },
];

const bars = [38, 52, 44, 66, 58, 79, 72, 94];

export default function HeroVisual() {
  return (
    <div className="hv">
      <div className="hv__panel">
        {/* Barra de ventana */}
        <div className="hv__bar">
          <span className="hv__dots" aria-hidden="true">
            <i /> <i /> <i />
          </span>
          <span className="hv__bar-title">Automatiza360 · Panel de operaciones</span>
          <span className="hv__live">
            <span className="hv__live-dot" /> En vivo
          </span>
        </div>

        <div className="hv__body">
          {/* KPIs */}
          <div className="hv__kpis">
            <div className="hv__kpi">
              <span className="hv__kpi-label">Leads hoy</span>
              <strong className="hv__kpi-value">47</strong>
              <span className="hv__kpi-delta">+18%</span>
            </div>
            <div className="hv__kpi">
              <span className="hv__kpi-label">Respuesta media</span>
              <strong className="hv__kpi-value">42 s</strong>
              <span className="hv__kpi-delta">-96%</span>
            </div>
            <div className="hv__kpi">
              <span className="hv__kpi-label">Reuniones</span>
              <strong className="hv__kpi-value">12</strong>
              <span className="hv__kpi-delta">+5</span>
            </div>
          </div>

          {/* Flujo de automatización */}
          <div className="hv__flow">
            <div className="hv__flow-head">
              <span>Flujo activo — Captación comercial</span>
              <span className="hv__tag">Automático</span>
            </div>

            <ul className="hv__steps">
              {flow.map((step, i) => (
                <li
                  className={`hv__step hv__step--${step.tone}`}
                  key={step.label}
                  style={{ '--i': i }}
                >
                  <span className="hv__step-icon">
                    <Icon name={step.icon} size={15} strokeWidth={2} />
                  </span>
                  <span className="hv__step-text">
                    <strong>{step.label}</strong>
                    <em>{step.sub}</em>
                  </span>
                  {i < flow.length - 1 && <span className="hv__step-line" aria-hidden="true" />}
                </li>
              ))}
            </ul>
          </div>

          {/* Gráfico */}
          <div className="hv__chart">
            <div className="hv__chart-head">
              <span>Oportunidades cerradas</span>
              <strong>+38%</strong>
            </div>
            <div className="hv__bars">
              {bars.map((h, i) => (
                <span key={i} className="hv__bar-item" style={{ '--h': `${h}%`, '--i': i }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tarjeta flotante: agente de IA */}
      <div className="hv__float hv__float--chat">
        <div className="hv__float-head">
          <span className="hv__avatar">IA</span>
          <div>
            <strong>Agente comercial</strong>
            <em>respondiendo ahora</em>
          </div>
        </div>
        <p className="hv__bubble">
          «Tenemos hueco el jueves a las 10:30. ¿Te reservo la llamada?»
        </p>
      </div>

      {/* Tarjeta flotante: ahorro */}
      <div className="hv__float hv__float--saved">
        <span className="hv__saved-icon">
          <Icon name="clock" size={17} strokeWidth={2} />
        </span>
        <div>
          <strong>15 h / semana</strong>
          <em>tiempo recuperado</em>
        </div>
      </div>
    </div>
  );
}
