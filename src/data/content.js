/* =============================================================
   CONTENIDO / COPY — Automatiza360
   Todo el texto de la landing vive aquí.
   Cambia textos sin tocar los componentes.
   ============================================================= */

export const brand = {
  name: 'Automatiza360',
  tagline: 'Automatización e IA para negocios que quieren crecer sin crecer en tareas.',
  ctaPrimary: 'Reserva una llamada',
  ctaSecondary: 'Ver cómo funciona',
};

/* -------------------------------------------------------------------------
   CONTACTO — configura aquí el destino de todos los CTA de la página.

   ⚠️  PENDIENTE DE CONFIGURAR
   Pon tu número de WhatsApp en formato internacional y sin símbolos:
     España   → '34612345678'
     Colombia → '573001234567'
     México   → '525512345678'

   Mientras esté vacío, los botones "Reserva una llamada" hacen scroll al
   bloque de contacto del final en lugar de abrir WhatsApp.
   La lógica está en src/lib/cta.js
   ------------------------------------------------------------------------- */
export const contact = {
  whatsappNumber: '',
  whatsappMessage:
    'Hola, quiero agendar una llamada para conocer los servicios de Automatiza360.',
  email: 'atencion_cliente@automatiza360.com',
};

export const nav = [
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Casos de uso', href: '#casos-de-uso' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'FAQ', href: '#faq' },
];

export const hero = {
  badge: 'Diagnóstico de automatización gratuito',
  titleTop: 'Tu negocio puede vender más',
  titleGradient: 'trabajando menos horas',
  subtitle:
    'Implementamos automatizaciones e inteligencia artificial para que captes más clientes, respondas al instante y dejes de perder ventas en tareas manuales. Sin ampliar tu equipo.',
  bullets: [
    'Respondes a cada lead en segundos, no en días',
    'Seguimiento comercial que no se olvida de nadie',
    'Tus herramientas por fin conectadas entre sí',
  ],
  proof: 'Más de 120 procesos automatizados para pymes, agencias y negocios digitales.',
};

export const metrics = [
  { value: '+38%', label: 'más reuniones cerradas', detail: 'con seguimiento automático' },
  { value: '15h', label: 'ahorradas por semana', detail: 'media por equipo' },
  { value: '<2 min', label: 'de respuesta a un lead', detail: 'a cualquier hora' },
  { value: '120+', label: 'procesos automatizados', detail: 'en producción real' },
];

export const problems = {
  eyebrow: 'El punto de partida',
  title: 'Si algo de esto te suena, estás perdiendo dinero cada semana',
  subtitle:
    'No es un problema de esfuerzo. Es un problema de procesos que dependen de que alguien se acuerde de hacerlos.',
  items: [
    {
      icon: 'snow',
      title: 'Los leads se enfrían',
      text: 'Un cliente pregunta a las 22:00 y le respondes al día siguiente. Para entonces ya habló con tu competencia.',
    },
    {
      icon: 'bellOff',
      title: 'El seguimiento depende de la memoria',
      text: 'Presupuestos enviados que nadie vuelve a tocar. La venta no se pierde: se olvida.',
    },
    {
      icon: 'copy',
      title: 'Copias y pegas todo el día',
      text: 'Del formulario a la hoja de cálculo, de ahí al CRM y del CRM al email. Horas que no aportan nada.',
    },
    {
      icon: 'unlink',
      title: 'Tus herramientas no se hablan',
      text: 'WhatsApp por un lado, el CRM por otro y el calendario por otro. Nadie tiene la foto completa.',
    },
    {
      icon: 'inbox',
      title: 'El soporte consume al equipo',
      text: 'Las mismas veinte preguntas cada día ocupando a personas que deberían estar vendiendo.',
    },
    {
      icon: 'users',
      title: 'Crecer significa contratar',
      text: 'Cada cliente nuevo suma trabajo manual, así que el margen se queda por el camino.',
    },
  ],
};

export const benefits = {
  eyebrow: 'Qué cambia',
  title: 'Un negocio que funciona aunque tú no estés delante',
  subtitle:
    'Diseñamos sistemas que trabajan solos: captan, responden, hacen seguimiento y avisan a tu equipo únicamente cuando hace falta una persona.',
  items: [
    {
      icon: 'bolt',
      title: 'Menos tareas manuales',
      text: 'Automatizamos lo repetitivo para que tu equipo dedique el tiempo a lo que sí genera ingresos.',
    },
    {
      icon: 'chat',
      title: 'Respuesta inmediata',
      text: 'Agentes de IA que atienden por WhatsApp y email 24/7, con tu tono y tu información.',
    },
    {
      icon: 'target',
      title: 'Mejor seguimiento comercial',
      text: 'Secuencias automáticas que persiguen cada oportunidad hasta que se cierra o se descarta.',
    },
    {
      icon: 'link',
      title: 'Herramientas integradas',
      text: 'CRM, formularios, calendario y base de datos sincronizados. Un único dato, siempre correcto.',
    },
    {
      icon: 'chart',
      title: 'Visibilidad real',
      text: 'Paneles claros para saber cuántos leads entran, qué pasa con ellos y dónde se atasca el proceso.',
    },
    {
      icon: 'shield',
      title: 'Escala sin contratar',
      text: 'El sistema absorbe el volumen extra. Creces en clientes, no en nóminas ni en caos.',
    },
  ],
};

export const howItWorks = {
  eyebrow: 'Cómo funciona',
  title: 'De proceso manual a sistema automático en 3 pasos',
  subtitle: 'Un método probado, sin proyectos eternos ni tecnicismos innecesarios.',
  steps: [
    {
      number: '01',
      title: 'Diagnóstico gratuito',
      text: 'En 30 minutos revisamos tu operativa y detectamos los cuellos de botella y las tareas que puedes dejar de hacer.',
      points: ['Mapa de tu proceso actual', 'Puntos de fuga de clientes', 'Prioridad por impacto'],
    },
    {
      number: '02',
      title: 'Diseño e implementación',
      text: 'Construimos las automatizaciones y los agentes de IA conectados a las herramientas que ya usas. Sin cambiar tu stack.',
      points: ['Flujos a medida', 'Integraciones y CRM', 'Pruebas con casos reales'],
    },
    {
      number: '03',
      title: 'Medición y mejora',
      text: 'Lanzamos, medimos resultados y ajustamos. Tu equipo recibe formación para usarlo desde el primer día.',
      points: ['Panel de métricas', 'Formación al equipo', 'Optimización continua'],
    },
  ],
};

export const useCases = {
  eyebrow: 'Casos de uso',
  title: 'Lo que implementamos con más frecuencia',
  subtitle:
    'Piezas que funcionan solas o combinadas en un sistema completo de captación, venta y soporte.',
  items: [
    {
      tag: 'Captación',
      title: 'Captación automática de leads',
      text: 'Cada formulario, anuncio o mensaje entra al sistema, se enriquece y se asigna sin intervención manual.',
    },
    {
      tag: 'Ventas',
      title: 'Seguimiento por email y WhatsApp',
      text: 'Secuencias que reactivan oportunidades frías y recuerdan presupuestos pendientes en el momento justo.',
    },
    {
      tag: 'Agenda',
      title: 'Agendado automático de reuniones',
      text: 'El lead reserva solo en el calendario correcto, con recordatorios que reducen las ausencias.',
    },
    {
      tag: 'IA',
      title: 'Clasificación de leads con IA',
      text: 'La IA puntúa cada contacto por intención y encaje para que tu equipo llame primero a quien más importa.',
    },
    {
      tag: 'Soporte',
      title: 'Atención al cliente automatizada',
      text: 'Un agente resuelve las dudas frecuentes al instante y escala a una persona solo cuando aporta valor.',
    },
    {
      tag: 'Operaciones',
      title: 'Presupuestos y recordatorios',
      text: 'Documentos generados y enviados automáticamente, con avisos de pago y renovación sin perseguir a nadie.',
    },
    {
      tag: 'Datos',
      title: 'Sincronización CRM e interno',
      text: 'Tus bases de datos y tu CRM siempre alineados. Un solo lugar donde consultar la verdad.',
    },
    {
      tag: 'Control',
      title: 'Paneles de negocio en tiempo real',
      text: 'Un panel único con leads, conversión y tiempos de respuesta para decidir con datos, no con intuición.',
    },
  ],
};

export const testimonials = {
  eyebrow: 'Resultados',
  title: 'Negocios que dejaron de perder ventas por el camino',
  items: [
    {
      quote:
        'Pasamos de responder en horas a responder en segundos. Solo con eso cerramos un 30% más de presupuestos el primer trimestre.',
      name: 'Marta Ruiz',
      role: 'Directora comercial, estudio de reformas',
      initials: 'MR',
    },
    {
      quote:
        'Automatizaron la captación y el seguimiento de la agencia entera. Hemos doblado clientes con el mismo equipo de siempre.',
      name: 'Carlos Vidal',
      role: 'Fundador, agencia de marketing',
      initials: 'CV',
    },
    {
      quote:
        'El agente de IA resuelve el 70% de las consultas de soporte. Mi equipo por fin trabaja en lo importante.',
      name: 'Lucía Benítez',
      role: 'CEO, formación online',
      initials: 'LB',
    },
  ],
};

export const faq = {
  eyebrow: 'Dudas frecuentes',
  title: 'Todo lo que sueles preguntarte antes de empezar',
  items: [
    {
      q: '¿Qué incluye exactamente el diagnóstico gratuito?',
      a: 'Una sesión de 30 minutos donde revisamos tu proceso comercial y operativo, identificamos las tareas repetitivas que más tiempo consumen y te entregamos un plan priorizado por impacto. Trabajes o no con nosotros, el plan es tuyo.',
    },
    {
      q: '¿Necesito conocimientos técnicos o cambiar mis herramientas?',
      a: 'No. Trabajamos sobre el stack que ya usas: WhatsApp, tu CRM, tus formularios, tu calendario y tus bases de datos. Si falta alguna pieza, la proponemos, pero nunca te obligamos a migrar.',
    },
    {
      q: '¿Cuánto tarda en estar funcionando?',
      a: 'Las primeras automatizaciones suelen estar en producción entre 1 y 3 semanas. Los sistemas más completos, con varios agentes de IA e integraciones, entre 4 y 8 semanas según el alcance.',
    },
    {
      q: '¿Esto sirve si mi negocio es pequeño?',
      a: 'Sí, y a menudo es donde más se nota. Cuanto más pequeño es el equipo, más pesan las tareas manuales. Empezamos por el proceso que más dinero o tiempo te está costando.',
    },
    {
      q: '¿La IA puede responder algo inadecuado a mis clientes?',
      a: 'Los agentes se entrenan con tu información, tu tono y límites claros. Cuando una consulta se sale del guion, escalan a una persona. Además, revisamos conversaciones reales durante las primeras semanas.',
    },
    {
      q: '¿Qué pasa después de la implementación?',
      a: 'Te entregamos documentación y formación para que seas autónomo. Si lo prefieres, ofrecemos un plan de soporte y mejora continua con revisión mensual de métricas.',
    },
  ],
};

export const finalCta = {
  eyebrow: 'Siguiente paso',
  title: 'Descubre cuánto tiempo y cuántas ventas estás dejando sobre la mesa',
  subtitle:
    'Reserva una llamada estratégica gratuita de 30 minutos. Analizamos tu operativa y te enseñamos qué automatizar primero para notar resultados en semanas.',
  points: [
    '30 minutos, sin compromiso',
    'Plan de automatización priorizado',
    'Estimación de horas y ventas recuperables',
  ],
};

export const footer = {
  description:
    'Automatizaciones e inteligencia artificial para pymes, agencias y negocios digitales que quieren crecer sin multiplicar el trabajo manual.',
  columns: [
    {
      title: 'Servicios',
      links: [
        { label: 'Automatización de ventas', href: '#casos-de-uso' },
        { label: 'Agentes de IA', href: '#casos-de-uso' },
        { label: 'Integraciones y CRM', href: '#casos-de-uso' },
        { label: 'Soporte automatizado', href: '#casos-de-uso' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Cómo trabajamos', href: '#como-funciona' },
        { label: 'Casos y resultados', href: '#testimonios' },
        { label: 'Preguntas frecuentes', href: '#faq' },
        { label: 'Contacto', href: '#reservar' },
      ],
    },
  ],
  legal: [
    { label: 'Aviso legal', href: '#' },
    { label: 'Privacidad', href: '#' },
    { label: 'Cookies', href: '#' },
  ],
};
