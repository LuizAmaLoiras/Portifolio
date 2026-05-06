import { ArrowUpRight, Code2, ExternalLink, GraduationCap, Layers3, TerminalSquare } from 'lucide-react';

const highlights = [
  { label: 'Estudante', value: 'Colegio Marista Sao Luis' },
  { label: 'Foco', value: 'Web, interfaces e sistemas' },
  { label: 'Estilo', value: 'Futurista, responsivo e funcional' }
];

export default function Hero({ githubUrl }) {
  return (
    <section className="hero section" id="inicio">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">
            <Code2 size={17} />
            Desenvolvedor JR
          </span>
          <h1>
            Sou <span>desenvolvedor JR</span> e crio experiencias digitais com tecnologia.
          </h1>
          <p>
            Sou estudante do Colegio Marista Sao Luis e estou construindo minha trajetoria em
            desenvolvimento web. Meu objetivo e transformar ideias em projetos reais, com paginas
            bem organizadas, visual moderno, automacoes, paineis e sistemas que funcionam de verdade.
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

          <div className="hero-stats">
            {highlights.map((item) => (
              <article key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.value}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="hero-card">
          <div className="orbital-ring"></div>
          <div className="orbital-ring orbital-ring-two"></div>
          <div className="profile-core">
            <Layers3 size={40} />
            <strong>I❤️CODE</strong>
            <span>HTML 50% - Java - JS - Python - CSS - C#</span>
          </div>
          <div className="floating-chip chip-one">
            <GraduationCap size={16} /> Marista Sao Luis
          </div>
          <div className="floating-chip chip-two">
            <TerminalSquare size={16} /> Web Systems
          </div>
          <div className="floating-chip chip-three">Projetos em loop</div>
          <div className="holo-panel">
            <span>STATUS</span>
            <strong>aprendendo / criando / publicando</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
