import { Cpu, Rocket, ShieldCheck } from 'lucide-react';

const cards = [
  {
    icon: Rocket,
    title: 'Projetos modernos',
    text: 'Gosto de criar interfaces bonitas, rápidas e fáceis de usar.'
  },
  {
    icon: Cpu,
    title: 'Soluções funcionais',
    text: 'Busco transformar ideias em sistemas úteis e organizados.'
  },
  {
    icon: ShieldCheck,
    title: 'Evolução constante',
    text: 'Sempre estudando novas tecnologias para melhorar meus projetos.'
  }
];

export default function About() {
  return (
    <section className="section" id="sobre">
      <div className="container split">
        <div>
          <span className="eyebrow">Sobre mim</span>
          <h2>Desenvolvedor intermediário focado em experiências digitais responsivas.</h2>
          <p>
            Sou um desenvolvedor intermediário e gosto de criar projetos modernos, responsivos e
            funcionais usando programação. Trabalho com lógica, interfaces, sistemas e soluções que
            unem visual tecnológico com usabilidade.
          </p>
        </div>
        <div className="about-grid">
          {cards.map(({ icon: Icon, title, text }) => (
            <article className="glass-card compact-card" key={title}>
              <Icon size={26} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
