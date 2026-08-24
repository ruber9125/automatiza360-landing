import { contact } from '../data/content';

/**
 * DESTINO DEL CTA PRINCIPAL ("Reserva una llamada")
 *
 * Si hay un número de WhatsApp configurado en `contact.whatsappNumber`,
 * todos los CTA abren una conversación con el mensaje inicial ya escrito.
 * Si NO lo hay, hacen scroll al bloque de contacto del final.
 *
 * Ese respaldo es deliberado: es preferible que el botón lleve a la sección
 * de contacto a que abra WhatsApp contra un número inventado.
 *
 * Para activarlo: pon tu número en src/data/content.js → contact.whatsappNumber
 */

const ANCLA_CONTACTO = '#reservar';

/** Deja solo dígitos: acepta '+34 612 34 56 78' y devuelve '34612345678'. */
function normalizarNumero(numero) {
  return String(numero || '').replace(/\D/g, '');
}

/** true si hay un número utilizable configurado. */
export const whatsappConfigurado = normalizarNumero(contact.whatsappNumber).length >= 8;

/** URL de la conversación de WhatsApp, o null si no está configurado. */
export function urlWhatsapp(mensaje = contact.whatsappMessage) {
  if (!whatsappConfigurado) return null;
  const numero = normalizarNumero(contact.whatsappNumber);
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

/**
 * Props listas para pasar a <Button> o a un <a>.
 * Incluye target y rel solo cuando el enlace sale del sitio.
 *
 *   <Button {...propsCtaPrincipal()}>Reserva una llamada</Button>
 */
export function propsCtaPrincipal(mensaje) {
  const url = urlWhatsapp(mensaje);

  if (!url) {
    return { href: ANCLA_CONTACTO };
  }

  return {
    href: url,
    target: '_blank',
    rel: 'noopener noreferrer',
  };
}

// Aviso en desarrollo para que no pase desapercibido que falta configurarlo.
if (import.meta.env.DEV && !whatsappConfigurado) {
  console.warn(
    '[Automatiza360] Falta el número de WhatsApp. Los CTA apuntan al ancla ' +
      `${ANCLA_CONTACTO} en lugar de abrir una conversación.\n` +
      'Configúralo en src/data/content.js → contact.whatsappNumber'
  );
}
