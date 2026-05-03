import { ExternalLink, Send } from 'lucide-react';

export default function Contact({ githubUrl }) {
  return (
    <section className="section contact-section" id="contato">
      <div className="container contact-card glass-card">
        <span className="eyebrow">Contato</span>
        <h2>Vamos criar algo moderno?</h2>
        <p>
          Entre em contato pelo GitHub para ver meus projetos, acompanhar minha evolução e conversar
          sobre ideias de sites, sistemas e soluções com programação.
        </p>
        <div className="hero-actions">
          <a className="button primary" href={githubUrl} target="_blank" rel="noreferrer">
            <ExternalLink size={19} />
            Abrir GitHub
          </a>
          <a className="button secondary" href="#inicio">
            <Send size={18} />
            Voltar ao início
          </a>
        </div>
      </div>
    </section>
  );
}
