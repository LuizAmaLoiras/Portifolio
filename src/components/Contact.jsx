import { ExternalLink, Mail, Send } from 'lucide-react';
import { useState } from 'react';

const contactEmail = 'visionplugimoveis@gmail.com';

export default function Contact({ githubUrl }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const sendMessage = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent('Contato pelo portifolio');
    const body = encodeURIComponent(
      [
        'Ola, vim pelo seu portifolio e quero entrar em contato.',
        '',
        `Nome: ${form.name || '-'}`,
        `Email: ${form.email || '-'}`,
        '',
        `Mensagem: ${form.message || '-'}`
      ].join('\n')
    );

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="section contact-section" id="contato">
      <div className="container contact-card glass-card">
        <div className="contact-copy">
          <span className="eyebrow">Contato</span>
          <h2>Vamos criar algo moderno?</h2>
          <p>
            Envie uma mensagem para o meu email e vamos conversar sobre sites, sistemas,
            portfólios e soluções com programação.
          </p>
          <a className="email-link" href={`mailto:${contactEmail}`}>
            <Mail size={18} />
            {contactEmail}
          </a>
          <div className="hero-actions">
            <a className="button secondary" href={githubUrl} target="_blank" rel="noreferrer">
              <ExternalLink size={19} />
              Abrir GitHub
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={sendMessage}>
          <label>
            Nome
            <input
              name="name"
              type="text"
              placeholder="Seu nome"
              value={form.name}
              onChange={updateField}
            />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              placeholder="voce@email.com"
              value={form.email}
              onChange={updateField}
            />
          </label>
          <label>
            Mensagem
            <textarea
              name="message"
              placeholder="Digite sua mensagem"
              value={form.message}
              onChange={updateField}
            ></textarea>
          </label>
          <button className="button primary" type="submit">
            <Send size={18} />
            Enviar mensagem
          </button>
        </form>
      </div>
    </section>
  );
}
