import { ExternalLink, Mail, Send } from 'lucide-react';

const contactEmail = 'visionplugimoveis@gmail.com';

export default function Contact({ githubUrl }) {
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

        <form
          className="contact-form"
          action={`https://formsubmit.co/${contactEmail}`}
          method="POST"
        >
          <input type="hidden" name="_subject" value="Nova mensagem pelo portifolio" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <label>
            Nome
            <input
              name="name"
              type="text"
              placeholder="Seu nome"
              required
            />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              placeholder="voce@email.com"
              required
            />
          </label>
          <label>
            Mensagem
            <textarea
              name="message"
              placeholder="Digite sua mensagem"
              required
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
