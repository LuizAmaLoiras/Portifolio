import { CheckCircle2, ExternalLink, Mail, MessageCircle, Phone, Send, User } from 'lucide-react';
import { useState } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient.js';
import { createWhatsAppUrl } from '../utils/whatsapp.js';

const contactEmail = 'visionplugimoveis@gmail.com';

const initialForm = {
  full_name: '',
  email: '',
  phone: '',
  project_interest: '',
  message: '',
  website: ''
};

function cleanText(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function isValidPhone(phone) {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

export default function Contact({ githubUrl }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) return;
    if (form.website) return;

    const payload = {
      full_name: cleanText(form.full_name, 120),
      email: cleanText(form.email, 180).toLowerCase(),
      phone: cleanText(form.phone, 32),
      project_interest: cleanText(form.project_interest, 160) || null,
      message: cleanText(form.message, 1500)
    };

    if (payload.full_name.length < 2) {
      setError('Informe seu nome.');
      return;
    }

    if (!isValidEmail(payload.email)) {
      setError('Informe um email valido.');
      return;
    }

    if (!isValidPhone(payload.phone)) {
      setError('Informe um telefone ou WhatsApp valido.');
      return;
    }

    if (payload.message.length < 5) {
      setError('Escreva uma mensagem um pouco mais completa.');
      return;
    }

    if (!isSupabaseConfigured) {
      setError('Supabase ainda nao foi configurado para receber contatos.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const { error: insertError } = await supabase.from('portfolio_contacts').insert(payload);
    setLoading(false);

    if (insertError) {
      setError(`Nao foi possivel enviar agora. Supabase: ${insertError.message}`);
      return;
    }

    setForm(initialForm);
    setSuccess('Mensagem enviada para a area admin com sucesso.');
    window.setTimeout(() => setSuccess(''), 4200);
  }

  return (
    <section className="section contact-section" id="contato">
      <div className="container contact-card glass-card">
        <div className="contact-copy">
          <span className="eyebrow">Contato</span>
          <h2>Vamos criar algo moderno?</h2>
          <p>
            Preencha seus dados e a mensagem sera salva no mesmo Supabase usado como base admin.
            Assim fica mais organizado para acompanhar contatos, ideias e possiveis projetos.
          </p>
          <a className="email-link" href={`mailto:${contactEmail}`}>
            <Mail size={18} />
            {contactEmail}
          </a>
          <div className="hero-actions">
            <a
              className="button primary"
              href={createWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={19} />
              Entrar em contato comigo
            </a>
            <a className="button secondary" href={githubUrl} target="_blank" rel="noreferrer">
              <ExternalLink size={19} />
              Abrir GitHub
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            className="hidden-field"
            tabIndex="-1"
            autoComplete="off"
            value={form.website}
            onChange={(event) => updateField('website', event.target.value)}
            aria-hidden="true"
          />

          <label>
            Nome
            <span className="field-shell">
              <User size={17} />
              <input
                name="name"
                type="text"
                placeholder="Seu nome"
                value={form.full_name}
                onChange={(event) => updateField('full_name', event.target.value)}
                required
              />
            </span>
          </label>
          <label>
            Email
            <span className="field-shell">
              <Mail size={17} />
              <input
                name="email"
                type="email"
                placeholder="voce@email.com"
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
                required
              />
            </span>
          </label>
          <label>
            Telefone ou WhatsApp
            <span className="field-shell">
              <Phone size={17} />
              <input
                name="phone"
                type="tel"
                placeholder="(00) 00000-0000"
                value={form.phone}
                onChange={(event) => updateField('phone', event.target.value)}
                required
              />
            </span>
          </label>
          <label>
            Projeto de interesse
            <input
              name="project_interest"
              type="text"
              placeholder="Ex: site, sistema, portfolio, landing page"
              value={form.project_interest}
              onChange={(event) => updateField('project_interest', event.target.value)}
            />
          </label>
          <label>
            Mensagem
            <textarea
              name="message"
              placeholder="Digite sua mensagem"
              value={form.message}
              onChange={(event) => updateField('message', event.target.value)}
              required
            ></textarea>
          </label>

          {error && <p className="form-alert error-alert">{error}</p>}
          {success && (
            <p className="form-alert success-alert">
              <CheckCircle2 size={18} /> {success}
            </p>
          )}

          <button className="button primary" type="submit" disabled={loading}>
            <Send size={18} />
            {loading ? 'Enviando...' : 'Enviar para admin'}
          </button>
        </form>
      </div>
    </section>
  );
}
