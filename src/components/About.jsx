import { Cpu, GraduationCap, Rocket, ShieldCheck } from 'lucide-react';

const cards = [
  {
    icon: GraduationCap,
    title: 'Formacao',
    text: 'Estudante do Colegio Marista Sao Luis, unindo rotina escolar com pratica constante em tecnologia.'
  },
  {
    icon: Rocket,
    title: 'Projetos modernos',
    text: 'Crio paginas, sistemas e experiencias digitais com visual futurista, animacoes e responsividade.'
  },
  {
    icon: Cpu,
    title: 'Raciocinio tecnico',
    text: 'Gosto de entender o problema, organizar a estrutura e montar solucoes que sejam bonitas e uteis.'
  },
  {
    icon: ShieldCheck,
    title: 'Evolucao constante',
    text: 'Cada projeto vira um laboratorio para aprender mais sobre codigo, design, deploy e experiencia do usuario.'
  }
];

export default function About() {
  return (
    <section className="section" id="sobre">
      <div className="container split">
        <div>
          <span className="eyebrow">Sobre mim</span>
          <h2>Estudante, criador e desenvolvedor JR em crescimento.</h2>
          <p>
            Meu portifolio reune projetos que mostram minha evolucao em HTML, CSS, JavaScript,
            React, Python, Java e C#. Eu gosto de construir telas com identidade forte, pensar na
            experiencia de quem usa e deixar cada detalhe mais profissional.
          </p>
          <p>
            Ainda estou estudando e aprendendo todos os dias, mas ja busco trabalhar com uma visao
            completa: estrutura clara, visual marcante, codigo organizado, publicacao online e
            melhoria continua depois que o projeto fica pronto.
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
