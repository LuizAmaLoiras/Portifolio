import { MessageCircle } from 'lucide-react';
import { createWhatsAppUrl, getWhatsAppNumber } from '../utils/whatsapp.js';

export default function WhatsAppButton() {
  const hasNumber = Boolean(getWhatsAppNumber());
  const message =
    import.meta.env.VITE_WHATSAPP_MESSAGE ||
    'Ola, vim pelo portifolio do Luiz Felipe e quero entrar em contato.';

  return (
    <a
      href={createWhatsAppUrl(message)}
      target={hasNumber ? '_blank' : undefined}
      rel={hasNumber ? 'noreferrer' : undefined}
      aria-label="Entrar em contato comigo pelo WhatsApp"
      className="whatsapp-float"
    >
      <MessageCircle size={22} />
      <span>Entrar em contato comigo</span>
    </a>
  );
}
