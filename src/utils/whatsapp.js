const DEFAULT_WHATSAPP_NUMBER = '5581995094769';
const DEFAULT_WHATSAPP_MESSAGE =
  'Ola, vim pelo portifolio do Luiz Felipe e quero entrar em contato.';

export function onlyDigits(value) {
  return String(value || '').replace(/\D/g, '');
}

export function getWhatsAppNumber() {
  return onlyDigits(import.meta.env.VITE_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER);
}

export function createWhatsAppUrl(message = DEFAULT_WHATSAPP_MESSAGE) {
  const number = getWhatsAppNumber();

  if (!number) return '#contato';

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
