import { ArrowUpRight, Code2, ExternalLink, Layers3 } from 'lucide-react';

export default function Hero({ githubUrl }) {
  return (
    <section className="hero section" id="inicio">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">
            <Code2 size={17} />
            Desenvolvedor Intermediário
          </span>
          <h1>
            Olá, eu sou um <span>Desenvolvedor Intermediário</span>
          </h1>
          <p>
            Crio sites, sistemas e soluções com programação, unindo interfaces modernas,
            responsividade e código funcional para transformar ideias em experiências digitais.
          </p>
          <div className="hero-actions">
            <a className="button primary" href={githubUrl} target="_blank" rel="noreferrer">
              <ExternalLink size={19} />
              Ver GitHub
            </a>
            <a className="button secondary" href="#projetos">
              Ver projetos
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>

        <div className="hero-card">
          <div className="orbital-ring"></div>
          <div className="profile-core">
            <Layers3 size={40} />
            <strong>DEV</strong>
            <span>Java • JavaScript • Python • CSS • C#</span>
          </div>
          <div className="floating-chip chip-one">React UI</div>
          <div className="floating-chip chip-two">Clean Code</div>
          <div className="floating-chip chip-three">Systems</div>
        </div>
      </div>
    </section>
  );
}
